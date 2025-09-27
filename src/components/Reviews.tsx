import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  user_id: string;
  product_id: string | null;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .is('product_id', null)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Fetch profiles separately to avoid relationship errors
      const reviewsWithProfiles = await Promise.all(
        (data || []).map(async (review) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('user_id', review.user_id)
            .single();
          
          return {
            ...review,
            profiles: profile || { full_name: 'Anonymous' }
          };
        })
      );

      setReviews(reviewsWithProfiles);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.comment.trim()) {
      toast({
        title: "Please add a comment",
        description: "Your review comment cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          rating: newReview.rating,
          comment: newReview.comment.trim(),
          product_id: null // General store review
        });

      if (error) throw error;

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback!",
      });

      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => onRatingChange?.(star) : undefined}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-sweet text-4xl md:text-5xl text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read reviews from our delighted customers and share your own experience
          </p>
        </div>

        {/* Submit Review Form */}
        {user && (
          <Card className="max-w-2xl mx-auto mb-16">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating</label>
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview({ ...newReview, rating })
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Tell us about your experience with Sweet Dreams..."
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={handleSubmitReview}
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id} className="sweet-shadow hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">
                        {review.profiles?.full_name || 'Anonymous'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
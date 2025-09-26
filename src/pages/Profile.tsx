import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Profile {
  full_name: string;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  items: any;
  created_at: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
      createDemoOrders(); // Create demo orders for demonstration
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDemoOrders = async () => {
    if (!user) return;

    try {
      // Check if user already has orders
      const { data: existingOrders } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      if (existingOrders && existingOrders.length > 0) {
        // User already has orders, fetch them
        fetchOrders();
        return;
      }

      // Create demo orders for new users
      const demoOrders = [
        {
          user_id: user.id,
          order_number: `SW-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          total_amount: 45.99,
          status: 'completed',
          items: [
            { name: "Chocolate Truffles", quantity: 2, price: 15.99 },
            { name: "Strawberry Macarons", quantity: 6, price: 14.01 }
          ],
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          user_id: user.id,
          order_number: `SW-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          total_amount: 32.50,
          status: 'completed',
          items: [
            { name: "Vanilla Cupcakes", quantity: 4, price: 12.00 },
            { name: "Gift Box Medium", quantity: 1, price: 20.50 }
          ],
          created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      const { error } = await supabase
        .from('orders')
        .insert(demoOrders);

      if (error) throw error;

      fetchOrders();
    } catch (error) {
      console.error('Error creating demo orders:', error);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "Come back soon for more sweet treats!",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center sweet-shadow">
                <span className="text-2xl">🍭</span>
              </div>
              <div>
                <h1 className="font-sweet text-2xl text-primary">Sweet Dreams</h1>
                <p className="text-sm text-muted-foreground">Your Profile</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Info */}
          <div className="md:col-span-1">
            <Card className="soft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <p className="font-medium text-foreground">
                    {profile?.full_name || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium text-foreground">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Member Since</label>
                  <p className="font-medium text-foreground">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History */}
          <div className="md:col-span-2">
            <Card className="soft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                  <span>Order History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-lg p-4 transition-smooth hover:bg-muted/50"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              Order {order.order_number}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              ${order.total_amount.toFixed(2)}
                            </p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="text-foreground">${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🛒</span>
                    </div>
                    <p className="text-muted-foreground">No orders yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Start shopping to see your orders here!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
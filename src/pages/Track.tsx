import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, Truck, CheckCircle, ClipboardCheck, MapPin, Users, Check } from "lucide-react";

interface TrackingStep {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  icon: React.ElementType;
}

const sampleTrackingData = {
  donationId: "DON-2024-78945",
  status: "Delivered",
  recipient: {
    name: "Hope Children's Shelter",
    location: "Andheri East, Mumbai",
    impact: "Fed 150 children a nutritious meal",
  },
  timeline: [
    {
      id: 1,
      title: "Donation Confirmed",
      description: "Your generous donation has been registered in our system",
      date: "Jan 20, 2024",
      time: "10:30 AM",
      completed: true,
      icon: CheckCircle,
    },
    {
      id: 2,
      title: "Pickup Scheduled",
      description: "Our volunteer will collect the donation from your location",
      date: "Jan 20, 2024",
      time: "11:00 AM",
      completed: true,
      icon: Package,
    },
    {
      id: 3,
      title: "In Transit",
      description: "Your donation is on its way to our distribution center",
      date: "Jan 20, 2024",
      time: "2:15 PM",
      completed: true,
      icon: Truck,
    },
    {
      id: 4,
      title: "Quality Check & Sorting",
      description: "Items verified and prepared for distribution",
      date: "Jan 21, 2024",
      time: "9:00 AM",
      completed: true,
      icon: ClipboardCheck,
    },
    {
      id: 5,
      title: "Out for Delivery",
      description: "Donation dispatched to recipient organization",
      date: "Jan 21, 2024",
      time: "11:30 AM",
      completed: true,
      icon: MapPin,
    },
    {
      id: 6,
      title: "Delivered & Impact Made",
      description: "Your donation has reached those in need",
      date: "Jan 21, 2024",
      time: "1:45 PM",
      completed: true,
      icon: Users,
    },
  ] as TrackingStep[],
};

const Track = () => {
  const [donationId, setDonationId] = useState("");
  const [trackingData, setTrackingData] = useState<typeof sampleTrackingData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo, always show sample data
    setTrackingData(sampleTrackingData);
    setIsSearching(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Track Your Donation's Journey
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              See exactly where your donation is and the impact it's making
            </p>
            
            <form 
              onSubmit={handleSearch} 
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Donation ID (e.g., DON-2024-78945)"
                  value={donationId}
                  onChange={(e) => setDonationId(e.target.value)}
                  className="pl-12 h-14 text-base bg-card border-0 shadow-lg"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8" disabled={isSearching}>
                {isSearching ? (
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  "Track"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingData && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Status Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-secondary/10 text-secondary px-6 py-3 rounded-full mb-4">
                <Check className="w-5 h-5" />
                <span className="font-semibold">{trackingData.status}</span>
              </div>
              <h2 className="text-2xl font-bold">Donation ID: {trackingData.donationId}</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Timeline */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle>Delivery Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {trackingData.timeline.map((step, index) => (
                        <div 
                          key={step.id} 
                          className="flex gap-4 pb-8 last:pb-0 animate-slide-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Line */}
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                              step.completed 
                                ? "gradient-hero shadow-soft" 
                                : "bg-muted"
                            }`}>
                              <step.icon className={`w-5 h-5 ${step.completed ? "text-primary-foreground" : "text-muted-foreground"}`} />
                            </div>
                            {index < trackingData.timeline.length - 1 && (
                              <div className={`w-0.5 flex-1 mt-2 ${step.completed ? "bg-primary" : "bg-border"}`} />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                              <h3 className="font-semibold">{step.title}</h3>
                              <span className="text-sm text-muted-foreground">
                                {step.date} • {step.time}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recipient Details */}
              <div className="space-y-6">
                <Card className="border-0 shadow-card animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Recipient Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Organization</p>
                      <p className="font-semibold">{trackingData.recipient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{trackingData.recipient.location}</p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="bg-secondary/10 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Impact Made</p>
                        <p className="font-semibold text-secondary">{trackingData.recipient.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="border-0 shadow-card overflow-hidden animate-scale-in" style={{ animationDelay: "0.1s" }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Delivery Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Map View Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Results State */}
      {!trackingData && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Donation ID</h3>
              <p className="text-muted-foreground">
                You'll find your donation ID in the confirmation email we sent you after your donation was registered.
              </p>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Track;

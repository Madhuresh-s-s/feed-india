import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Apple, Droplet, Truck, Users, BookOpen, ArrowRight, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const foodCategories = [
  {
    icon: Package,
    title: "Non-Perishable Essentials",
    items: ["Rice", "Pulses (Dal)", "Cooking Oil", "Flour (Atta)", "Sugar", "Salt"],
    color: "from-primary to-primary/70",
  },
  {
    icon: Apple,
    title: "Fresh & Ready-to-Eat",
    items: ["Fresh Fruits", "Vegetables", "Pre-packaged Meals", "Bread & Bakery", "Dairy Products"],
    color: "from-secondary to-secondary/70",
  },
  {
    icon: Droplet,
    title: "Supplies & Logistics",
    items: ["Water Bottles", "Blankets", "Soap & Hygiene", "Utensils", "Storage Containers"],
    color: "from-accent-foreground to-accent-foreground/70",
  },
];

const donationTiers = [
  {
    amount: 1500,
    title: "Community Meal",
    description: "Provides one full day of meals for a shelter or community kitchen",
    icon: Users,
    impact: "Feeds 50+ people",
    featured: false,
  },
  {
    amount: 15000,
    title: "Distribution Support",
    description: "Covers fuel and maintenance for our distribution fleet for one week",
    icon: Truck,
    impact: "Delivers 500+ meals",
    featured: true,
  },
  {
    amount: 30000,
    title: "Awareness Program",
    description: "Sponsors community awareness program and volunteer training session",
    icon: BookOpen,
    impact: "Trains 100+ volunteers",
    featured: false,
  },
];

const Donate = () => {
  const handleDonateClick = (amount: number) => {
    toast({
      title: "Redirecting to Payment",
      description: `You will be redirected to our secure payment portal for ₹${amount.toLocaleString('en-IN')}`,
    });
  };

  const handleSchedulePickup = () => {
    toast({
      title: "Schedule Pickup",
      description: "Please login to schedule a food pickup or drop-off.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4 animate-fade-in">
              Make a Difference Today
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              Your <span className="text-gradient">Donation</span> Feeds Hope
            </h1>
            <p className="text-muted-foreground text-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Choose how you'd like to contribute – donate food items or make a financial contribution to support our mission.
            </p>
          </div>
        </div>
      </section>

      {/* Food Donation Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Donate Food Items</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We accept various types of food items. From non-perishable essentials to fresh produce – every contribution makes an impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {foodCategories.map((category, index) => (
              <Card 
                key={category.title}
                className="border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card text-center">
            <h3 className="text-xl font-semibold mb-3">Ready to Donate Food?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              We accept bulk donations from businesses and individual drop-offs. Schedule a convenient pickup or find a drop-off point near you.
            </p>
            <Button size="lg" onClick={handleSchedulePickup}>
              <Truck className="w-5 h-5 mr-2" />
              Schedule a Pickup or Drop-off
            </Button>
          </div>
        </div>
      </section>

      {/* Financial Contribution Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Financial Contribution</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your monetary donation helps us maintain our operations, expand our reach, and serve more communities in need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {donationTiers.map((tier, index) => (
              <Card 
                key={tier.amount}
                className={`border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 animate-slide-up relative overflow-hidden ${tier.featured ? 'ring-2 ring-primary' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-0 right-0 gradient-hero text-center py-1">
                    <span className="text-xs font-semibold text-primary-foreground">Most Popular</span>
                  </div>
                )}
                <CardHeader className={tier.featured ? 'pt-10' : ''}>
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <tier.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold">₹{tier.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <CardTitle className="text-xl">{tier.title}</CardTitle>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-secondary font-medium">
                    <Check className="w-5 h-5" />
                    <span>{tier.impact}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={tier.featured ? "default" : "outline"}
                    onClick={() => handleDonateClick(tier.amount)}
                  >
                    Donate ₹{tier.amount.toLocaleString('en-IN')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              All donations are tax-deductible under Section 80G of the Income Tax Act.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;

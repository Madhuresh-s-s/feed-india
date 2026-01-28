import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Heart, LogOut, Plus, MapPin, Clock, Package, Utensils, Home, HandHeart, Search, Phone, IndianRupee, Menu, X } from "lucide-react";

interface Donation {
  id: string;
  donationType: string;
  foodItem: string;
  quantity: string;
  location: string;
  bestBefore: string;
  amount: string;
  paymentMethod: string;
  purpose: string;
  notes: string;
  createdAt: Date;
}

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Donate", path: "/donate", icon: HandHeart },
  { name: "Track Donation", path: "/track", icon: Search },
  { name: "Contact", path: "/contact", icon: Phone },
];

const donationTypes = [
  { value: "food", label: "Food Items", icon: Utensils },
  { value: "monetary", label: "Monetary", icon: IndianRupee },
  { value: "supplies", label: "Supplies & Essentials", icon: Package },
];

const paymentMethods = [
  { value: "upi", label: "UPI" },
  { value: "bank", label: "Bank Transfer" },
  { value: "card", label: "Credit/Debit Card" },
  { value: "cash", label: "Cash" },
];

const donationPurposes = [
  { value: "general", label: "General Fund" },
  { value: "meals", label: "Daily Meals Program" },
  { value: "fleet", label: "Distribution Fleet" },
  { value: "training", label: "Volunteer Training" },
  { value: "awareness", label: "Awareness Campaign" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    donationType: "",
    foodItem: "",
    quantity: "",
    location: "",
    bestBefore: "",
    amount: "",
    paymentMethod: "",
    purpose: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation based on donation type
    if (!formData.donationType) {
      toast({
        title: "Missing Information",
        description: "Please select a donation type.",
        variant: "destructive",
      });
      return;
    }

    if (formData.donationType === "monetary") {
      if (!formData.amount || !formData.paymentMethod || !formData.purpose) {
        toast({
          title: "Missing Information",
          description: "Please fill in amount, payment method, and purpose.",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!formData.foodItem || !formData.quantity || !formData.location || !formData.bestBefore) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newDonation: Donation = {
      id: `DON-${Date.now()}`,
      ...formData,
      createdAt: new Date(),
    };

    setDonations([newDonation, ...donations]);
    setFormData({ 
      donationType: "", 
      foodItem: "", 
      quantity: "", 
      location: "", 
      bestBefore: "", 
      amount: "",
      paymentMethod: "",
      purpose: "",
      notes: "" 
    });
    
    toast({
      title: "Donation Posted!",
      description: "Your food donation has been listed. A volunteer will contact you soon.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="gradient-hero shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary-foreground">Donor Dashboard</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium"
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary-foreground/20 animate-slide-up">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-elevated sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Post Food Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="donationType">Donation Type *</Label>
                    <Select 
                      value={formData.donationType}
                      onValueChange={(value) => setFormData({ ...formData, donationType: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select donation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {donationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <span className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              {type.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conditional Fields based on Donation Type */}
                  {formData.donationType === "monetary" ? (
                    <>
                      {/* Monetary Donation Fields */}
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (₹) *</Label>
                        <Input
                          id="amount"
                          name="amount"
                          type="text"
                          placeholder="e.g., 1500, 15000, 30000"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method *</Label>
                        <Select 
                          value={formData.paymentMethod}
                          onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.value} value={method.value}>
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="purpose">Donation Purpose *</Label>
                        <Select 
                          value={formData.purpose}
                          onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            {donationPurposes.map((purpose) => (
                              <SelectItem key={purpose.value} value={purpose.value}>
                                {purpose.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : formData.donationType ? (
                    <>
                      {/* Food / Supplies Donation Fields */}
                      <div className="space-y-2">
                        <Label htmlFor="foodItem">
                          {formData.donationType === "supplies" ? "Item Description *" : "Food Item / Type *"}
                        </Label>
                        <Input
                          id="foodItem"
                          name="foodItem"
                          type="text"
                          placeholder={
                            formData.donationType === "supplies"
                              ? "e.g., Blankets, Utensils, Water bottles"
                              : "e.g., Cooked Rice, Fresh Vegetables"
                          }
                          value={formData.foodItem}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          type="text"
                          placeholder={
                            formData.donationType === "supplies"
                              ? "e.g., 20 blankets, 50 bottles"
                              : "e.g., 10 plates, 5 kg"
                          }
                          value={formData.quantity}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Pickup Location *</Label>
                        <Input
                          id="location"
                          name="location"
                          type="text"
                          placeholder="Address or area name"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bestBefore">
                          {formData.donationType === "supplies" ? "Pickup Window *" : "Best Before *"}
                        </Label>
                        <Select 
                          value={formData.bestBefore}
                          onValueChange={(value) => setFormData({ ...formData, bestBefore: value })}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select time window" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">Within 2 hours</SelectItem>
                            <SelectItem value="4">Within 4 hours</SelectItem>
                            <SelectItem value="6">Within 6 hours</SelectItem>
                            <SelectItem value="8">Within 8 hours</SelectItem>
                            <SelectItem value="24">Within 24 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : null}

                  {/* Notes - always shown when type is selected */}
                  {formData.donationType && (
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder={
                          formData.donationType === "monetary"
                            ? "Any message you'd like to share with us..."
                            : "Any special instructions or details..."
                        }
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full h-12" disabled={isSubmitting || !formData.donationType}>
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        {formData.donationType === "monetary" ? (
                          <>
                            <IndianRupee className="w-4 h-4 mr-2" />
                            Submit Donation
                          </>
                        ) : formData.donationType === "supplies" ? (
                          <>
                            <Package className="w-4 h-4 mr-2" />
                            Post Supplies Donation
                          </>
                        ) : (
                          <>
                            <Utensils className="w-4 h-4 mr-2" />
                            Post Food Donation
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Donations List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Donations</h2>
              <span className="text-muted-foreground text-sm">
                {donations.length} donation{donations.length !== 1 ? "s" : ""} posted
              </span>
            </div>

            {donations.length === 0 ? (
              <Card className="border-0 shadow-card">
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                    <Package className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Donations Yet</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Post your first food donation using the form. Your generosity can feed someone in need today.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {donations.map((donation, index) => {
                  const donationType = donationTypes.find(t => t.value === donation.donationType);
                  const TypeIcon = donationType?.icon || Utensils;
                  const isMonetary = donation.donationType === "monetary";
                  const purposeLabel = donationPurposes.find(p => p.value === donation.purpose)?.label;
                  const paymentLabel = paymentMethods.find(p => p.value === donation.paymentMethod)?.label;
                  
                  return (
                    <Card 
                      key={donation.id}
                      className="border-0 shadow-card hover:shadow-elevated transition-all duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMonetary ? 'bg-success/20' : 'gradient-hero'}`}>
                            <TypeIcon className={`w-5 h-5 ${isMonetary ? 'text-success' : 'text-primary-foreground'}`} />
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                              {donation.id}
                            </span>
                            <span className="text-xs font-medium text-primary capitalize">
                              {donationType?.label || donation.donationType}
                            </span>
                          </div>
                        </div>

                        {isMonetary ? (
                          <>
                            <h3 className="font-semibold text-2xl mb-3 text-success">₹{donation.amount}</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <IndianRupee className="w-4 h-4" />
                                <span>{paymentLabel || donation.paymentMethod}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Heart className="w-4 h-4" />
                                <span>{purposeLabel || donation.purpose}</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="font-semibold text-lg mb-3">{donation.foodItem}</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Package className="w-4 h-4" />
                                <span>{donation.quantity}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{donation.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {donation.donationType === "supplies" ? "Pickup within" : "Best within"} {donation.bestBefore} hours
                                </span>
                              </div>
                            </div>
                          </>
                        )}

                        {donation.notes && (
                          <p className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                            {donation.notes}
                          </p>
                        )}

                        {!isMonetary && (
                          <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-xs text-muted-foreground">Donor Location Preview</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

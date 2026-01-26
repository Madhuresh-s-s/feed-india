import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Users, 
  TrendingUp, 
  Clock, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Truck,
  MapPin,
  Calendar,
  IndianRupee,
  Heart,
  Building,
  User
} from "lucide-react";

// Mock data for donations
const mockDonations = [
  { id: "DON-2024-001", donor: "Rajesh Kumar", type: "Food", item: "Rice & Dal", quantity: "50 kg", location: "Mumbai", status: "delivered", date: "2024-01-15", recipient: "Hope Shelter" },
  { id: "DON-2024-002", donor: "Priya Foods Ltd", type: "Food", item: "Ready Meals", quantity: "200 plates", location: "Delhi", status: "in-transit", date: "2024-01-16", recipient: "Community Kitchen" },
  { id: "DON-2024-003", donor: "Amit Sharma", type: "Monetary", item: "₹15,000", quantity: "-", location: "Bangalore", status: "completed", date: "2024-01-16", recipient: "General Fund" },
  { id: "DON-2024-004", donor: "Green Grocers", type: "Food", item: "Fresh Vegetables", quantity: "30 kg", location: "Chennai", status: "pending", date: "2024-01-17", recipient: "Pending Assignment" },
  { id: "DON-2024-005", donor: "Hotel Sunshine", type: "Food", item: "Cooked Food", quantity: "100 plates", location: "Hyderabad", status: "pickup-scheduled", date: "2024-01-17", recipient: "Street Children NGO" },
  { id: "DON-2024-006", donor: "Meera Patel", type: "Monetary", item: "₹1,500", quantity: "-", location: "Pune", status: "completed", date: "2024-01-17", recipient: "Meal Program" },
  { id: "DON-2024-007", donor: "Fresh Mart", type: "Food", item: "Bread & Bakery", quantity: "80 units", location: "Kolkata", status: "quality-check", date: "2024-01-18", recipient: "Orphanage Care" },
  { id: "DON-2024-008", donor: "Corporate Cares Inc", type: "Monetary", item: "₹30,000", quantity: "-", location: "Mumbai", status: "completed", date: "2024-01-18", recipient: "Training Program" },
];

const mockUsers = [
  { id: "USR-001", name: "Rajesh Kumar", email: "rajesh@email.com", type: "individual", donations: 12, joined: "2023-06-15", status: "active" },
  { id: "USR-002", name: "Priya Foods Ltd", email: "contact@priyafoods.com", type: "corporate", donations: 45, joined: "2023-03-20", status: "active" },
  { id: "USR-003", name: "Hope Foundation", email: "info@hopefoundation.org", type: "organization", donations: 0, joined: "2023-08-10", status: "active" },
  { id: "USR-004", name: "Amit Sharma", email: "amit.sharma@email.com", type: "individual", donations: 5, joined: "2023-11-05", status: "active" },
  { id: "USR-005", name: "Green Grocers", email: "green@grocers.com", type: "corporate", donations: 28, joined: "2023-04-12", status: "active" },
  { id: "USR-006", name: "Meera Patel", email: "meera.p@email.com", type: "individual", donations: 3, joined: "2024-01-02", status: "pending" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  "pending": { label: "Pending", variant: "outline", icon: Clock },
  "pickup-scheduled": { label: "Pickup Scheduled", variant: "secondary", icon: Calendar },
  "in-transit": { label: "In Transit", variant: "secondary", icon: Truck },
  "quality-check": { label: "Quality Check", variant: "secondary", icon: Eye },
  "delivered": { label: "Delivered", variant: "default", icon: CheckCircle },
  "completed": { label: "Completed", variant: "default", icon: CheckCircle },
  "cancelled": { label: "Cancelled", variant: "destructive", icon: XCircle },
};

const userTypeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  "individual": { icon: User, color: "text-blue-600" },
  "organization": { icon: Building, color: "text-purple-600" },
  "corporate": { icon: TrendingUp, color: "text-green-600" },
};

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const stats = [
    { label: "Total Donations", value: "1,247", icon: Package, change: "+12%", color: "text-primary" },
    { label: "Active Donors", value: "856", icon: Users, change: "+8%", color: "text-success" },
    { label: "Meals Served", value: "45,230", icon: Heart, change: "+23%", color: "text-secondary" },
    { label: "Funds Raised", value: "₹12.5L", icon: IndianRupee, change: "+15%", color: "text-accent-foreground" },
  ];

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesSearch = 
      donation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
    const matchesType = typeFilter === "all" || donation.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <Layout>
      <section className="min-h-screen py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor donations, manage users, and track impact</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-success mt-1">{stat.change} this month</p>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-accent flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="donations" className="animate-fade-in">
            <TabsList className="mb-6">
              <TabsTrigger value="donations" className="gap-2">
                <Package className="w-4 h-4" />
                Donations
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Donations Tab */}
            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>All Donations</CardTitle>
                      <CardDescription>Manage and track all donation activities</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search donations..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-full sm:w-64"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-40">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="pickup-scheduled">Pickup Scheduled</SelectItem>
                          <SelectItem value="in-transit">In Transit</SelectItem>
                          <SelectItem value="quality-check">Quality Check</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="monetary">Monetary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Item/Amount</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Recipient</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDonations.map((donation) => {
                          const status = statusConfig[donation.status];
                          const StatusIcon = status?.icon || Clock;
                          return (
                            <TableRow key={donation.id}>
                              <TableCell className="font-mono text-sm">{donation.id}</TableCell>
                              <TableCell className="font-medium">{donation.donor}</TableCell>
                              <TableCell>
                                <Badge variant={donation.type === "Monetary" ? "secondary" : "outline"}>
                                  {donation.type}
                                </Badge>
                              </TableCell>
                              <TableCell>{donation.item}</TableCell>
                              <TableCell>{donation.quantity}</TableCell>
                              <TableCell>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {donation.location}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge variant={status?.variant || "outline"} className="gap-1">
                                  <StatusIcon className="w-3 h-3" />
                                  {status?.label || donation.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">{donation.recipient}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{donation.date}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  {filteredDonations.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No donations found matching your criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Registered Users</CardTitle>
                      <CardDescription>Manage donors and organizations</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Donations</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => {
                          const userType = userTypeConfig[user.type];
                          const TypeIcon = userType?.icon || User;
                          return (
                            <TableRow key={user.id}>
                              <TableCell className="font-mono text-sm">{user.id}</TableCell>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell className="text-muted-foreground">{user.email}</TableCell>
                              <TableCell>
                                <span className={`flex items-center gap-1 capitalize ${userType?.color}`}>
                                  <TypeIcon className="w-4 h-4" />
                                  {user.type}
                                </span>
                              </TableCell>
                              <TableCell>{user.donations}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{user.joined}</TableCell>
                              <TableCell>
                                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Trends</CardTitle>
                    <CardDescription>Monthly donation activity overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-accent/50 rounded-lg">
                      <div className="text-center text-muted-foreground">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Chart visualization</p>
                        <p className="text-sm">Connect to backend for live data</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribution by Type</CardTitle>
                    <CardDescription>Food vs Monetary donations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Food Donations</span>
                          <span className="text-sm text-muted-foreground">68%</span>
                        </div>
                        <div className="h-3 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-[68%] bg-primary rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Monetary Donations</span>
                          <span className="text-sm text-muted-foreground">32%</span>
                        </div>
                        <div className="h-3 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-[32%] bg-success rounded-full" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Donors</CardTitle>
                    <CardDescription>Most active contributors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUsers
                        .sort((a, b) => b.donations - a.donations)
                        .slice(0, 5)
                        .map((user, index) => {
                          const userType = userTypeConfig[user.type];
                          const TypeIcon = userType?.icon || User;
                          return (
                            <div key={user.id} className="flex items-center gap-4">
                              <span className="text-lg font-bold text-muted-foreground w-6">#{index + 1}</span>
                              <div className={`w-10 h-10 rounded-full bg-accent flex items-center justify-center ${userType?.color}`}>
                                <TypeIcon className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground capitalize">{user.type}</p>
                              </div>
                              <Badge variant="secondary">{user.donations} donations</Badge>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest platform updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDonations.slice(0, 5).map((donation) => {
                        const status = statusConfig[donation.status];
                        const StatusIcon = status?.icon || Clock;
                        return (
                          <div key={donation.id} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center mt-0.5">
                              <StatusIcon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{donation.donor}</span> donated{" "}
                                <span className="font-medium">{donation.item}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">{donation.date}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;

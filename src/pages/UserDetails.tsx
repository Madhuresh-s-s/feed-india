import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  User, 
  Building, 
  TrendingUp, 
  Mail, 
  Calendar,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye
} from "lucide-react";

// Mock data - same as Admin page for consistency
const mockUsers = [
  { id: "USR-001", name: "Rajesh Kumar", email: "rajesh@email.com", type: "individual", donations: 12, joined: "2023-06-15", status: "active" },
  { id: "USR-002", name: "Priya Foods Ltd", email: "contact@priyafoods.com", type: "corporate", donations: 45, joined: "2023-03-20", status: "active" },
  { id: "USR-003", name: "Hope Foundation", email: "info@hopefoundation.org", type: "organization", donations: 0, joined: "2023-08-10", status: "active" },
  { id: "USR-004", name: "Amit Sharma", email: "amit.sharma@email.com", type: "individual", donations: 5, joined: "2023-11-05", status: "active" },
  { id: "USR-005", name: "Green Grocers", email: "green@grocers.com", type: "corporate", donations: 28, joined: "2023-04-12", status: "active" },
  { id: "USR-006", name: "Meera Patel", email: "meera.p@email.com", type: "individual", donations: 3, joined: "2024-01-02", status: "pending" },
];

const mockDonationsByUser: Record<string, Array<{ id: string; type: string; item: string; quantity: string; location: string; status: string; date: string; recipient: string }>> = {
  "USR-001": [
    { id: "DON-2024-001", type: "Food", item: "Rice & Dal", quantity: "50 kg", location: "Mumbai", status: "delivered", date: "2024-01-15", recipient: "Hope Shelter" },
    { id: "DON-2024-010", type: "Food", item: "Vegetables", quantity: "20 kg", location: "Mumbai", status: "in-transit", date: "2024-01-18", recipient: "Community Kitchen" },
  ],
  "USR-002": [
    { id: "DON-2024-002", type: "Food", item: "Ready Meals", quantity: "200 plates", location: "Delhi", status: "in-transit", date: "2024-01-16", recipient: "Community Kitchen" },
    { id: "DON-2024-011", type: "Food", item: "Packaged Snacks", quantity: "500 units", location: "Delhi", status: "pending", date: "2024-01-19", recipient: "School Program" },
    { id: "DON-2024-012", type: "Monetary", item: "₹50,000", quantity: "-", location: "Delhi", status: "completed", date: "2024-01-10", recipient: "General Fund" },
  ],
  "USR-004": [
    { id: "DON-2024-003", type: "Monetary", item: "₹15,000", quantity: "-", location: "Bangalore", status: "completed", date: "2024-01-16", recipient: "General Fund" },
  ],
  "USR-005": [
    { id: "DON-2024-004", type: "Food", item: "Fresh Vegetables", quantity: "30 kg", location: "Chennai", status: "pending", date: "2024-01-17", recipient: "Pending Assignment" },
    { id: "DON-2024-013", type: "Food", item: "Fruits", quantity: "25 kg", location: "Chennai", status: "delivered", date: "2024-01-12", recipient: "Orphanage Care" },
  ],
  "USR-006": [
    { id: "DON-2024-006", type: "Monetary", item: "₹1,500", quantity: "-", location: "Pune", status: "completed", date: "2024-01-17", recipient: "Meal Program" },
  ],
};

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

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const user = mockUsers.find(u => u.id === userId);
  const [userDonations, setUserDonations] = useState(mockDonationsByUser[userId || ""] || []);

  if (!user) {
    return (
      <Layout>
        <section className="min-h-screen py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
            <Button onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const userType = userTypeConfig[user.type];
  const TypeIcon = userType?.icon || User;

  const handleStatusChange = (donationId: string, newStatus: string) => {
    setUserDonations(prev => 
      prev.map(donation => 
        donation.id === donationId 
          ? { ...donation, status: newStatus }
          : donation
      )
    );
    toast({
      title: "Status Updated",
      description: `Donation ${donationId} status changed to ${statusConfig[newStatus]?.label || newStatus}`,
    });
  };

  return (
    <Layout>
      <section className="min-h-screen py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>

          {/* User Info Card */}
          <Card className="mb-8 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className={`w-20 h-20 rounded-2xl bg-accent flex items-center justify-center ${userType?.color}`}>
                  <TypeIcon className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-4 h-4" />
                      <span className="capitalize">{user.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined {user.joined}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {user.donations} total donations
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User's Donations */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
              <CardDescription>View and manage all donations from this user</CardDescription>
            </CardHeader>
            <CardContent>
              {userDonations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No donations from this user yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Item/Amount</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Update Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userDonations.map((donation) => {
                        const status = statusConfig[donation.status];
                        const StatusIcon = status?.icon || Clock;
                        return (
                          <TableRow key={donation.id}>
                            <TableCell className="font-mono text-sm">{donation.id}</TableCell>
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
                            <TableCell className="text-sm text-muted-foreground">{donation.recipient}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{donation.date}</TableCell>
                            <TableCell>
                              <Badge variant={status?.variant || "outline"} className="gap-1">
                                <StatusIcon className="w-3 h-3" />
                                {status?.label || donation.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={donation.status}
                                onValueChange={(value) => handleStatusChange(donation.id, value)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="pickup-scheduled">Pickup Scheduled</SelectItem>
                                  <SelectItem value="in-transit">In Transit</SelectItem>
                                  <SelectItem value="quality-check">Quality Check</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default UserDetails;

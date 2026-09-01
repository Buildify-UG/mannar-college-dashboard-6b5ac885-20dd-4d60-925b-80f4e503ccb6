import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Calendar, Clock, FileText, CreditCard, BookOpen, Award, LogOut, Menu, Bell, User, Download
} from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState<'student' | 'staff'>('student');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample data
  const attendanceData = [
    { date: 'Mon', present: 85 },
    { date: 'Tue', present: 90 },
    { date: 'Wed', present: 88 },
    { date: 'Thu', present: 92 },
    { date: 'Fri', present: 87 },
  ];

  const marksData = [
    { subject: 'Math', marks: 85, total: 100 },
    { subject: 'Physics', marks: 78, total: 100 },
    { subject: 'Chemistry', marks: 88, total: 100 },
    { subject: 'English', marks: 82, total: 100 },
  ];

  const feeStatus = [
    { name: 'Paid', value: 8500, fill: '#22c55e' },
    { name: 'Pending', value: 1500, fill: '#ef4444' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">MC</span>
            </div>
            <CardTitle className="text-2xl">Mannar College Madurai</CardTitle>
            <CardDescription>Attendance Management System</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  setIsLoggedIn(true);
                  setUserRole('student');
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Student Login
              </Button>
              <Button
                onClick={() => {
                  setIsLoggedIn(true);
                  setUserRole('staff');
                }}
                variant="outline"
              >
                Staff Login
              </Button>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              Demo: Click to enter dashboard
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MC</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Mannar College</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
              <User size={20} />
              <span className="text-sm font-medium">{userRole === 'student' ? 'Akshay Kumar' : 'Dr. Ramesh'}</span>
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLoggedIn(false)}
              className="gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all bg-white border-r border-border hidden lg:block overflow-y-auto`}>
          <nav className="p-4 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground px-4 py-2">MENU</div>
            <NavItem icon={<Calendar size={18} />} label="Dashboard" active />
            <NavItem icon={<Clock size={18} />} label="Attendance" />
            <NavItem icon={<BookOpen size={18} />} label="Internal Marks" />
            <NavItem icon={<CreditCard size={18} />} label="Online Fees" />
            <NavItem icon={<FileText size={18} />} label="Day Order" />
            <NavItem icon={<Award size={18} />} label="Bonafide Certificate" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div>
              <h2 className="text-3xl font-bold text-foreground">Welcome back, {userRole === 'student' ? 'Akshay' : 'Dr. Ramesh'}!</h2>
              <p className="text-muted-foreground">Here's your attendance and academic overview</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                title="Today's Attendance"
                value="Present"
                icon={<Calendar className="w-8 h-8 text-primary" />}
                bgColor="bg-blue-50"
              />
              <StatCard
                title="Current Attendance %"
                value="87.2%"
                icon={<Clock className="w-8 h-8 text-green-500" />}
                bgColor="bg-green-50"
              />
              <StatCard
                title="Pending Fees"
                value="₹1,500"
                icon={<CreditCard className="w-8 h-8 text-orange-500" />}
                bgColor="bg-orange-50"
              />
              <StatCard
                title="Internal Marks Avg"
                value="83.2%"
                icon={<BookOpen className="w-8 h-8 text-purple-500" />}
                bgColor="bg-purple-50"
              />
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="attendance" className="bg-white rounded-lg border border-border">
              <TabsList className="border-b border-border w-full justify-start rounded-none px-6 h-12">
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="marks">Marks</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              {/* Attendance Tab */}
              <TabsContent value="attendance" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Weekly Attendance Trend</CardTitle>
                      <CardDescription>Last 5 days attendance percentage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={attendanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="present" fill="#3b82f6" name="Attendance %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Attendance Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Present</span>
                          <span className="text-sm font-semibold">174 days</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Absent</span>
                          <span className="text-sm font-semibold">26 days</span>
                        </div>
                        <Progress value={13} className="h-2" />
                      </div>
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">Total Classes: 200</p>
                        <p className="text-2xl font-bold text-primary mt-2">87.2%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Marks Tab */}
              <TabsContent value="marks" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Internal Marks by Subject</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {marksData.map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">{item.subject}</span>
                              <span className="text-sm font-semibold">{item.marks}/{item.total}</span>
                            </div>
                            <Progress value={(item.marks / item.total) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="text-3xl font-bold text-primary">83.2%</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={marksData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="subject" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="marks" stroke="#3b82f6" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Fees Tab */}
              <TabsContent value="fees" className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fee Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={feeStatus}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ₹${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {feeStatus.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `₹${value}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fee Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                        <div>
                          <p className="text-sm font-medium">Paid</p>
                          <p className="text-2xl font-bold text-green-600">₹8,500</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200">
                        <div>
                          <p className="text-sm font-medium">Pending</p>
                          <p className="text-2xl font-bold text-red-600">₹1,500</p>
                        </div>
                        <Badge variant="destructive">Due</Badge>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 gap-2 mt-4">
                        <CreditCard size={18} />
                        Pay Online
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DocumentCard
                    title="Day Order"
                    description="Daily notices and announcements"
                    icon={<FileText className="w-8 h-8 text-blue-500" />}
                  />
                  <DocumentCard
                    title="Bonafide Certificate"
                    description="College bonafide certificate"
                    icon={<Award className="w-8 h-8 text-purple-500" />}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2 rounded transition ${
        active
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-foreground hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({
  title,
  value,
  icon,
  bgColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

function DocumentCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-md transition cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
          <Button variant="ghost" size="sm">
            <Download size={18} />
          </Button>
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <Button variant="outline" className="w-full mt-4" size="sm">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default Index;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import useFetch from "../../utils/hooks/useFetch";

export default function Dashboard() {
  const { data: routes } = useFetch<any[]>("/data/routes");
  const { data: customers } = useFetch<any[]>("/data/customers");
  const { data: shoptypes } = useFetch<any[]>("/data/shoptypes");
  const { data: users } = useFetch<any[]>("/data/users");
  const { data: shops } = useFetch<any[]>("/shops");

  // ---- KPI stats ----
  const stats = [
    { label: "Routes", value: routes?.length ?? 0 },
    { label: "Customers", value: customers?.length ?? 0 },
    { label: "Shop Types", value: shoptypes?.length ?? 0 },
    { label: "Users", value: users?.length ?? 0 },
    { label: "Shops", value: shops?.length ?? 0 },
  ];

  // ---- Chart data ----
  const shopTypesDistribution =
    shoptypes?.map((t) => ({
      name: t.label,
      value: shops?.filter((s) => s.shopTypeId === t.id).length ?? 0,
    })) ?? [];

  const usersByRole =
    users?.reduce<Record<string, number>>((acc, u) => {
      const role = u.User_Role?.label ?? "Unknown";
      acc[role] = (acc[role] ?? 0) + 1;
      return acc;
    }, {}) ?? {};

  const usersByRoleData = Object.entries(usersByRole).map(([name, value]) => ({ name, value }));

  const shopsOverTime =
    shops?.map((s) => ({
      date: new Date(s.createdAt).toLocaleDateString(),
      count: 1,
    })) ?? [];

  // Group by date
  const shopsByDate = Object.values(
    shopsOverTime.reduce<Record<string, number>>((acc, s) => {
      acc[s.date] = (acc[s.date] ?? 0) + 1;
      return acc;
    }, {})
  ).map((count, i) => ({
    date: Object.keys(
      shopsOverTime.reduce<Record<string, number>>((acc, s) => {
        acc[s.date] = (acc[s.date] ?? 0) + 1;
        return acc;
      }, {})
    )[i],
    count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        {/* KPI Cards */}
        {stats.map((s) => (
          <Grid item xs={6} md={2.4} key={s.label}>
            <Card>
              <CardContent>
                <Typography variant="h6">{s.value}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {s.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Shop Types Distribution</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={shopTypesDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {shopTypesDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Users by Role</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={usersByRoleData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Shops Created Over Time</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={shopsByDate}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
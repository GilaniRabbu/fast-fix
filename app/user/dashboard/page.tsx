import Statistics from "@/components/home/Statistics";

const page = () => {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your activity.
        </p>
      </div>
      <div className="container mx-auto">
        <Statistics />
      </div>
    </div>
  );
};

export default page;

import Navbar from "@/components/built-in/navbar";

export default async function UserProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();

  return (
    <div>
      <div className="w-full bg-white  md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <Navbar />
      </div>
      <div className=" bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-50 to-gray-100 w-full px-0   md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        {children}
      </div>
    </div>
  );
}

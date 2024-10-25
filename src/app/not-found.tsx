// app/not-found/page.tsx
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-5">
      <h1 className="text-rose-500 text-3xl font-bold" > 404 - صفحه مورد نظر یافت نشد</h1>
      <div className="w-full flex flex-row justify-center items-center gap-4" >
        <Link className="rounded-2xl bg-slate-500 text-white hover:bg-slate-600 p-3 " href="/">بازگشت به صفحه اصلی</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

import Link from "next/link";
import { signOut } from "../actions";

interface Props {
  backHref?: string;
  backLabel?: string;
}

export default function AdminHeader({
  backHref = "/",
  backLabel = "← 사이트로 이동",
}: Props) {
  return (
    <header className="bg-[#0d2444] text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg">AktechReverse</span>
        <span className="text-blue-300 text-sm">관리자</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href={backHref} className="text-sm text-gray-300 hover:text-white">
          {backLabel}
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="text-sm text-red-300 hover:text-red-100 font-medium"
          >
            로그아웃
          </button>
        </form>
      </div>
    </header>
  );
}

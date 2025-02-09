import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function BreadCrumbPart({ pageName }) {
  return (
    <div>
      <div className="breadcrumb-block style-img">
        <div className="breadcrumb-main bg-linear overflow-hidden">
          <div className="container lg:pt-[134px] pt-24 pb-10 relative">
            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
              <div className="text-content">
                <div className="heading2 text-secondary text-center">
                  {"Shop"}
                </div>
                <div className="link flex items-center justify-center gap-1 caption1 mt-3 text-secondary">
                  <Link href={"/"}>Homepage</Link>
                  <Icon.CaretRight size={14} className="text-purple2" />
                  <div className="text-purple2 capitalize">
                    {pageName || "Shop"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

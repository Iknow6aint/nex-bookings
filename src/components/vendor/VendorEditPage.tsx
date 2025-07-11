"use client";

import Image from "next/image";
import DisplayGrid from "./DisplayGrid";
import type { Service } from "@/app/services/service";
import { Facebook, Instagram, Pencil, Share } from "../Icons";
import { useState } from "react";
import { useParams } from "next/navigation";
import ShareWebsiteModal from "./ShareModal";
import { WebsiteSettings } from "@/app/services/website";
import Link from "next/link";
import { useSubscriptions } from "@/app/context/SubscriptionContext";

interface Props {
  services: Service[];
  settings: WebsiteSettings;
}

export default function VendorEdit({ services, settings }: Props) {
  const { userSubs, subsLoading, subsError, refreshUserSubs } =
    useSubscriptions();

  // 2️⃣ derive whether there’s an active subscription
  const hasActiveSubscription =
    !subsLoading &&
    !subsError &&
    userSubs &&
    userSubs.some((s) => s.status === "ACTIVE");

  const [openShareModal, setOpenShareModal] = useState(false);
  const params = useParams();
  const slug = params.slug;
  const publicUrl = `https://${slug}.osisopro.com`;
  const settingsTabParam = encodeURIComponent("Website Settings");

  return (
    <div className="min-h-screen flex flex-col items-center mx-auto">
      <header className="bg-[#F2F2F2] px-8 py-4 sm:py-4 text-white text-center w-full fixed top-0 z-10 flex items-center justify-center">
        <div className="relative w-full flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Vendor Logo"
            width={121}
            height={34}
            className="mx-auto"
          />
          <div className="absolute right-0 lg:right-10 flex text-[#6C35A7] font-bold text-[16px] gap-4 hidden md:flex">
            <Link href={`/vendor/profile?tab=${settingsTabParam}`}>
              <div className="flex gap-2 items-center hover:underline transition cursor-pointer md:text-[13px] lg:text-[16px]">
                <Pencil />
                <p>Edit Website</p>
              </div>
            </Link>
            <div
              onClick={() => setOpenShareModal(true)}
              className="flex gap-2 items-center hover:underline transition cursor-pointer md:text-[13px] lg:text-[16px]"
            >
              <Share />
              <p>Share Website Link</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] w-full pt-[50px] flex flex-col items-center px-5 sm:px-0">
        {/* Hero */}
        <div className="flex flex-col gap-3 py-10 text-center max-w-[487px] mt-10">
          <Link href={`/vendor/profile?tab=${settingsTabParam}`}>
            <h1 className="font-bold text-[20px] md:text-[30px] lg:text-[35px] text-[#6C35A7]">
              {settings.header}
            </h1>
          </Link>
          <Link href={`/vendor/profile?tab=${settingsTabParam}`}>
            <p className="font-medium text-[14px] md:text-[16px] lg:text-[18px] font-inter leading-[24px] md:leading-[34px]">
              {settings.tagline}
            </p>
          </Link>
          <div className="flex gap-10 justify-center mt-5">
            <Link href={settings.facebookLink}>
              <Facebook />
            </Link>
            <Link href={settings.instagramLink}>
              <Instagram />
            </Link>
          </div>
        </div>

        {/* Services */}
        <DisplayGrid services={services} />

        <ShareWebsiteModal
          open={openShareModal}
          onOpenChange={setOpenShareModal}
          url={publicUrl}
          settings={settings}
        />

        {/* Mobile bottom bar */}
        <div className="fixed bg-[#F2F2F2] py-5 px-2 w-full bottom-0 left-0 right-0 z-50 sm:hidden font-bold text-[14px] text-[#6C35A7]">
          <div className="flex gap-3 w-full">
            <Link
              href={`/vendor/profile?tab=${settingsTabParam}`}
              className="w-1/2 self-center"
            >
              <div className="flex gap-2 items-center  hover:underline transition cursor-pointer md:text-[13px] lg:text-[16px]">
                <Pencil />
                <p>Edit Website</p>
              </div>
            </Link>
            <div
              onClick={() => setOpenShareModal(true)}
              className="flex gap-2 items-center justify-center hover:underline transition cursor-pointer md:text-[13px] lg:text-[16px] w-1/2"
            >
              <Share />
              <p>Share Website Link</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-5 my-8 flex items-center text-black text-[20px] leading-[34px] w-full hidden sm:flex">
          <div className="flex-grow border-t border-[#807E7E]" />
          <span className="px-4">Powered by Osiso Pro</span>
          <div className="flex-grow border-t border-[#807E7E]" />
        </footer>
      </main>
    </div>
  );
}

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const VideoSection = () => {
  return (
    <div className="w-[100vw] h-[90vh] relative ">
      <Image src="/videoHome.gif" alt="video" layout="fill" objectFit="cover" />
      <Link href="/product-list">
        <Button
          variant="default"
          size="lg"
          className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex justify-center shadow-lg hover:scale-105 transition-transform"
        >
          Shop Now
        </Button>
      </Link>
    </div>
  );
};

export default VideoSection;

import heroimage from "@/public/heroimage.png";
import logo from "@/public/ishaaiyalogo-cropped.png";
import burger from "@/public/images/burger.jpg";
import kebab from "@/public/images/kebab.jpg";
import shawarma from "@/public/images/shawarma.jpg";
import noodles from "@/public/images/noodles.jpg";
import karahi from "@/public/images/karahi.jpg";
import chai from "@/public/images/chai.jpg";
import biryani from "@/public/images/biryani.jpg";
import heroBbq from "@/public/images/hero-bbq.jpg";
import heroBg from "@/public/images/hero-bg.jpg";
import avatar1 from "@/public/images/avatar-1.jpg";
import avatar2 from "@/public/images/avatar-2.jpg";
import avatar3 from "@/public/images/avatar-3.jpg";

const IMAGE_BY_PATH: Record<string, typeof burger> = {
  "/heroimage.png": heroimage,
  "/ishaaiyalogo-cropped.png": heroimage,
  "/ishaaiyalogo.png": heroimage,
  "/images/burger.jpg": burger,
  "/images/kebab.jpg": kebab,
  "/images/shawarma.jpg": shawarma,
  "/images/noodles.jpg": noodles,
  "/images/karahi.jpg": karahi,
  "/images/chai.jpg": chai,
  "/images/biryani.jpg": biryani,
  "/images/hero-bbq.jpg": heroBbq,
  "/images/hero-bg.jpg": heroBg,
  "/images/avatar-1.jpg": avatar1,
  "/images/avatar-2.jpg": avatar2,
  "/images/avatar-3.jpg": avatar3,
};

export function imageFor(src: string) {
  return IMAGE_BY_PATH[src] ?? heroBbq;
}

export const LOGO = logo;
export const HERO_IMAGE = heroimage;
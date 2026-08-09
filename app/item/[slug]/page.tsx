import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Gauge,
  PackageCheck,
  Phone,
  ShoppingBag,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QtyAddToCart } from "@/components/site/quantity-add-to-cart";
import { WhatsAppIcon } from "@/components/site/social-icons";
import { SectionHeading } from "@/components/site/section-heading";
import {
  CATEGORIES,
  CONTACT,
  DEALS,
  MENU_ITEMS,
  dealSlug,
  findItemBySlug,
  menuItemSlug,
} from "@/lib/data";

export function generateStaticParams() {
  return [
    ...MENU_ITEMS.map((item) => ({ slug: menuItemSlug(item) })),
    ...DEALS.map((deal) => ({ slug: dealSlug(deal) })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/item/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findItemBySlug(slug);
  if (!found) return { title: "Item Not Found — Ishaaiya Restaurant" };
  const name = found.type === "deal" ? found.deal.title : found.item.name;
  return {
    title: `${name} — Ishaaiya Restaurant & Catering`,
    description:
      found.type === "deal"
        ? found.deal.description
        : found.item.description,
  };
}

const QUICK_FACTS = [
  { icon: Clock, label: "Delivery", value: "30 min" },
  { icon: Flame, label: "Served", value: "Fresh & Hot" },
  { icon: PackageCheck, label: "Packing", value: "Leak-proof" },
] as const;

export default async function ItemPage(props: PageProps<"/item/[slug]">) {
  const { slug } = await props.params;
  const found = findItemBySlug(slug);
  if (!found) notFound();

  const isDeal = found.type === "deal";
  const deal = isDeal ? found.deal : null;
  const item = isDeal ? null : found.item;

  const title = isDeal ? deal!.title : item!.name;
  const description = isDeal ? deal!.description : item!.description;
  const image = isDeal ? deal!.image : item!.image;
  const price = isDeal ? deal!.price : item!.price;
  const oldPrice = isDeal ? deal!.oldPrice : null;
  const tag = isDeal ? deal!.tag : null;
  const category = isDeal
    ? null
    : CATEGORIES.find((c) => c.id === item!.category) ?? null;

  const related = isDeal
    ? DEALS.filter((d) => d.id !== deal!.id)
        .slice(0, 3)
        .map((d) => ({
          id: d.id,
          name: d.title,
          price: d.price,
          image: d.image,
          href: `/item/${dealSlug(d)}`,
        }))
    : MENU_ITEMS.filter(
        (i) => i.id !== item!.id && i.category === item!.category
      )
        .slice(0, 3)
        .map((m) => ({
          id: m.id,
          name: m.name,
          price: m.price,
          image: m.image,
          href: `/item/${menuItemSlug(m)}`,
        }));

  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : null;
  const savings = oldPrice ? oldPrice - price : null;
  const backHref = isDeal ? "/#deals" : "/#menu";
  const backLabel = isDeal ? "Deals" : "Menu";
  const waText = encodeURIComponent(
    `Hi! I want to order the ${title} (Rs. ${price}) from Ishaaiya Restaurant`
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0b09] pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-orange-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-700/10 blur-[110px]" />
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-amber-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        {/* breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm font-medium text-white/40">
          <Link
            href="/#home"
            className="transition-colors hover:text-orange-400"
          >
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link
            href={backHref}
            className="hidden transition-colors hover:text-orange-400 sm:inline"
          >
            {backLabel}
          </Link>
          <ChevronRight className="hidden sm:inline" />
          <span className="max-w-[200px] truncate text-white/70 sm:max-w-xs">
            {title}
          </span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* image */}
          <div className="group">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
              <Image
                src={image}
                alt={title}
                width={900}
                height={640}
                priority
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {discount && (
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3.5 py-1.5 text-sm font-black text-white shadow-lg shadow-orange-500/40">
                  <TrendingDown className="size-4" />
                  -{discount}% OFF
                </span>
              )}
              {tag && (
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md">
                  <Gauge className="size-3.5" />
                  {tag}
                </span>
              )}

              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                {category && (
                  <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-300 backdrop-blur-md">
                    {category.label}
                  </span>
                )}
                <div className="ml-auto flex flex-col items-end gap-1 rounded-2xl bg-black/60 px-4 py-2 backdrop-blur-md">
                  {oldPrice && (
                    <span className="text-xs font-medium text-white/50 line-through">
                      Rs. {oldPrice}
                    </span>
                  )}
                  <span className="text-2xl font-black leading-none text-white">
                    Rs. {price}
                  </span>
                </div>
              </div>
            </div>

            {/* quick facts */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {QUICK_FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center transition-colors hover:border-orange-500/30"
                >
                  <f.icon className="size-5 text-orange-400" />
                  <span className="text-xs font-bold text-white">{f.value}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* details */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-400">
                {isDeal ? "Limited Time Offer" : category?.label}
              </p>
              <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                {description}
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/50">
                {isDeal
                  ? `Yeh offer limited time ke liye hai — itni value aur kahin nahi milegi. Har portion fresh ingredients se banta hai aur garma garam deliver hota hai. Poore dine family ya friends ke liye perfect, aur order confirm hone par sirf 30 minute mein ghar par.`
                  : `Fresh ingredients se roz banaya jata hai aur order par garma garam deliver hota hai. Ishaaiya ka secret masala aur perfect portions — har bite mein wahi "Ishaaiya Taste". Apni zaiqa ke hisaab se extra spicy ya kam masala bhi bana sakte hain.`}
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/50">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-orange-400" />
                  Fresh ingredients — daily order, quality par pora bharosa
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-orange-400" />
                  Garma garam serve — delivery sirf 30 minute mein
                </li>
                {isDeal && (
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-orange-400" />
                    Best value deal — family size, budget friendly
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-orange-400" />
                    Extra spicy ya kam masala — checkout par note karein
                </li>
              </ul>
            </div>

            {/* price block */}
            <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-baseline gap-2.5">
                {oldPrice && (
                  <span className="text-lg font-medium text-white/40 line-through">
                    Rs. {oldPrice}
                  </span>
                )}
                <span className="text-3xl font-black text-white">
                  Rs. {price}
                </span>
              </div>
              {savings && (
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                  You save Rs. {savings}
                </span>
              )}
              <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-white/40">
                <Flame className="size-3.5 text-orange-400" />
                Best Price Guarantee
              </span>
            </div>

            {/* CTAs — all equal height */}
            <div className="flex items-center gap-2">
              <QtyAddToCart
                item={{
                  id: isDeal ? `deal-${deal!.id}` : `menu-${item!.id}`,
                  name: title,
                  price,
                  image,
                }}
              />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 rounded-xl border-white/20 bg-white/5 px-4 text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href={`${CONTACT.whatsappLink}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-4" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4">
              <span className="flex items-center gap-2.5 text-sm text-white/60">
                <Clock className="size-4 text-orange-400" />
                Hot, fresh aur 30 min mein delivered
              </span>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1.5 rounded-full text-white/80 hover:bg-white/10 hover:text-white"
              >
                <a href={CONTACT.phoneLink}>
                  <Phone className="size-3.5" />
                  {CONTACT.phone}
                </a>
              </Button>
            </div>

            <div className="mt-auto flex items-center gap-3 text-sm text-white/40">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="flex size-7 items-center justify-center rounded-full border-2 border-[#0d0b09] bg-gradient-to-br from-orange-500 to-red-500 text-[9px] font-black text-white"
                  >
                    {n * 2}+
                  </span>
                ))}
              </div>
              <span>
                <span className="font-bold text-white/80">1000+</span> orders
                isko mahine mein — Lahore bhar mein deliver ho raha hai
              </span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <SectionHeading
              eyebrow={isDeal ? "More Deals" : "More from the Menu"}
              title={isDeal ? "You might also like" : "Sab kuch try karna"}
              description={
                isDeal
                  ? "Dosray combos bhi same value par available hain."
                  : "Iska saath yeh dishes bhi bohot pasand ki jaati hain."
              }
              dark
            />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={r.href}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.name}
                      width={800}
                      height={500}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm font-black text-white backdrop-blur-md">
                      Rs. {r.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-5">
                    <h3 className="font-bold text-white">{r.name}</h3>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white opacity-0 shadow-lg shadow-orange-500/30 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                      <ShoppingBag className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2.5 rounded-full border-white/20 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href={backHref}>
              <ArrowLeft className="size-4" />
              Back to {backLabel}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
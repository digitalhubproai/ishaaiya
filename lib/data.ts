export const CONTACT = {
  whatsapp: "0333-2001695",
  whatsappLink: "https://wa.me/923332001695",
  phone: "0317-1244712",
  phoneLink: "tel:+923171244712",
  mapsLink: "https://maps.app.goo.gl/EVHSMeASHCt1HF8r5",
  facebook: "https://www.facebook.com/share/1A89SKAgRz/",
  instagram: "https://www.instagram.com",
  tiktok: "https://www.tiktok.com",
  youtube: "https://www.youtube.com",
  social: "@Ishaaiyarestaurant",
};

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Deals", href: "#deals" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const TICKER_ITEMS = [
  "Delicious Taste",
  "Best Quality",
  "Best Value",
  "Fast Food",
  "BBQ Platters",
  "Desi Food",
  "Chinese",
  "Home Delivery",
  "Tandoor & Tea",
];

export const STATS = [
  { value: 100, suffix: "+", label: "Menu Items" },
  { value: 10, suffix: "+", label: "Hot Deals" },
  { value: 30, suffix: "min", label: "Delivery Time" },
  { value: 4.9, suffix: "/5", label: "Customer Rating", decimals: 1 },
];

export type Deal = {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice: number;
  tag: string;
  image: string;
};

export const DEALS: Deal[] = [
  {
    id: 1,
    title: "Jumbo BBQ Platter",
    description: "Family-size platter — seekh kabab, chicken tikka, malai boti & BBQ rice.",
    price: 2899,
    oldPrice: 3400,
    tag: "Family Feast",
    image: "/images/hero-bbq.jpg",
  },
  {
    id: 2,
    title: "Fast Food Deal-2",
    description: "Zinger burger, broast, club sandwich + 1L drink. Itna combo kahin nahi milta.",
    price: 1299,
    oldPrice: 1750,
    tag: "Best Seller",
    image: "/images/burger.jpg",
  },
  {
    id: 3,
    title: "Mandi Combo",
    description: "Lahori/Mandi rice with raita, salad & soft drink for 2-3 people.",
    price: 1899,
    oldPrice: 2300,
    tag: "Popular",
    image: "/images/chai.jpg",
  },
  {
    id: 4,
    title: "Chicken Karahi Special",
    description: "1 kg chicken karahi with tandoori roti & chutney served hot.",
    price: 1999,
    oldPrice: 2500,
    tag: "Desi Favourite",
    image: "/images/karahi.jpg",
  },
  {
    id: 5,
    title: "BBQ Mini Platter",
    description: "Perfect for two — chicken tikka, seekh kabab & malai boti combo.",
    price: 1299,
    oldPrice: 1600,
    tag: "For 2",
    image: "/images/kebab.jpg",
  },
  {
    id: 6,
    title: "Chinese Combo",
    description: "Chicken fried rice + chicken manchurian + 1L soft drink.",
    price: 1499,
    oldPrice: 1900,
    tag: "Tandoori Twist",
    image: "/images/noodles.jpg",
  },
];

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
};

export type CategoryId =
  | "fast-food"
  | "bbq"
  | "desi"
  | "chinese"
  | "tandoor-tea";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "fast-food", label: "Fast Food" },
  { id: "bbq", label: "BBQ & Platters" },
  { id: "desi", label: "Desi Food" },
  { id: "chinese", label: "Chinese" },
  { id: "tandoor-tea", label: "Tandoor & Tea" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Fast Food
  { id: 1, name: "Zinger Burger", description: "Crispy chicken, lettuce & signature sauce", price: 450, category: "fast-food", image: "/images/burger.jpg" },
  { id: 2, name: "Zinger Roll Paratha", description: "Paratha wrap — desi style with hot sauce", price: 350, category: "fast-food", image: "/images/burger.jpg" },
  { id: 3, name: "Club Sandwich", description: "Triple layered with fries", price: 550, category: "fast-food", image: "/images/burger.jpg" },
  { id: 4, name: "Shawarma", description: "Loaded with garlic mayo & fries", price: 300, category: "fast-food", image: "/images/shawarma.jpg" },
  { id: 5, name: "Broast (Chicken)", description: "Crispy golden broast with fries", price: 650, category: "fast-food", image: "/images/kebab.jpg" },
  { id: 6, name: "Fries", description: "Crispy fries with cheese dip", price: 250, category: "fast-food", image: "/images/burger.jpg" },
  // BBQ & Platters
  { id: 7, name: "Chicken Tikka", description: "Char-grilled, marinated to perfection", price: 550, category: "bbq", image: "/images/hero-bbq.jpg" },
  { id: 8, name: "Seekh Kabab", description: "Juicy minced beef/chicken kebabs", price: 500, category: "bbq", image: "/images/kebab.jpg" },
  { id: 9, name: "Malai Boti", description: "Creamy, tender & smoky", price: 600, category: "bbq", image: "/images/hero-bbq.jpg" },
  { id: 10, name: "Jumbo BBQ Platter", description: "Full family platter — perfect for 4-5", price: 2899, category: "bbq", image: "/images/hero-bbq.jpg" },
  { id: 11, name: "Chicken BBQ Wings", description: "Spicy BBQ glaze wings", price: 480, category: "bbq", image: "/images/kebab.jpg" },
  { id: 12, name: "Lahori Chargha", description: "Full chicken — Lahore street style", price: 1600, category: "bbq", image: "/images/hero-bbq.jpg" },
  // Desi Food
  { id: 13, name: "Chicken Karahi", description: "Bhangay wali karahi, desi ghee", price: 1400, category: "desi", image: "/images/karahi.jpg" },
  { id: 14, name: "Beef Nihari", description: "Slow-cooked, rich & spicy", price: 550, category: "desi", image: "/images/karahi.jpg" },
  { id: 15, name: "Biryani", description: "Aromatic basmati — beef or chicken", price: 600, category: "desi", image: "/images/biryani.jpg" },
  { id: 16, name: "Mutton Karahi", description: "Tender mutton, thick gravy", price: 1800, category: "desi", image: "/images/karahi.jpg" },
  { id: 17, name: "Daal Makhni", description: "Creamy black lentils", price: 450, category: "desi", image: "/images/karahi.jpg" },
  { id: 18, name: "Palak Paneer", description: "Creamed spinach with paneer", price: 500, category: "desi", image: "/images/karahi.jpg" },
  // Chinese
  { id: 19, name: "Chicken Fried Rice", description: "Classic wok-fried rice", price: 500, category: "chinese", image: "/images/noodles.jpg" },
  { id: 20, name: "Chicken Manchurian", description: "Sweet & spicy gravy", price: 600, category: "chinese", image: "/images/noodles.jpg" },
  { id: 21, name: "Chicken Chow Mein", description: "Loaded noodles with veggies", price: 550, category: "chinese", image: "/images/noodles.jpg" },
  { id: 22, name: "Dynamite Chicken", description: "Crispy chili blast", price: 650, category: "chinese", image: "/images/noodles.jpg" },
  { id: 23, name: "Spring Rolls", description: "Crispy veg rolls (4 pcs)", price: 350, category: "chinese", image: "/images/noodles.jpg" },
  { id: 24, name: "Honey Garlic Chicken", description: "Sweet & tangy stir-fry", price: 650, category: "chinese", image: "/images/noodles.jpg" },
  // Tandoor & Tea
  { id: 25, name: "Tandoori Naan", description: "Fresh from clay oven", price: 60, category: "tandoor-tea", image: "/images/chai.jpg" },
  { id: 26, name: "Garlic Naan", description: "Buttery, garlic-topped", price: 100, category: "tandoor-tea", image: "/images/chai.jpg" },
  { id: 27, name: "Doodh Patti", description: "Strong, creamy — 4 chik wali", price: 120, category: "tandoor-tea", image: "/images/chai.jpg" },
  { id: 28, name: "Karah Chai", description: "Traditional Kashmiri pink tea", price: 150, category: "tandoor-tea", image: "/images/chai.jpg" },
  { id: 29, name: "Rasmalai", description: "Soft cottage cheese dessert", price: 200, category: "tandoor-tea", image: "/images/chai.jpg" },
  { id: 30, name: "Lassi", description: "thick & creamy sweet lassi", price: 180, category: "tandoor-tea", image: "/images/chai.jpg" },
];

export const TESTIMONIALS = [
  {
    name: "Ahmed Raza",
    role: "Regular Customer",
    text: "Jumbo BBQ Platter mangaya tha family ke liye — taste lajawab, quantity bhi bohot. Mandi rice ka swaad yaad reh gaya. Highly recommended!",
    avatar: "/images/avatar-1.jpg",
    rating: 5,
  },
  {
    name: "Sana Mirza",
    role: "Happy Customer",
    text: "Fast Food Deal-2 sirf 1299 mein — Zinger burger, broast, club sandwich aur 1L drink! Itni value aur kahin nahi milti. Shukriya Ishaaiya!",
    avatar: "/images/avatar-2.jpg",
    rating: 5,
  },
  {
    name: "Bilal Khan",
    role: "Foodie",
    text: "Chicken Karahi aur Nihari dono bohot mazedaar hain. Home delivery time pe, food bhi garma garam. Ab sirf Ishaaiya se order karta hoon!",
    avatar: "/images/avatar-3.jpg",
    rating: 5,
  },
];

export const FEATURES = [
  {
    title: "Fresh Ingredients",
    desc: "Daily sourced, never frozen",
    icon: "snowflake",
  },
  {
    title: "Home Delivery",
    desc: "Fast & reliable—everywhere",
    icon: "bike",
  },
  {
    title: "WhatsApp Orders",
    desc: "Easy one-message ordering",
    icon: "message",
  },
  {
    title: "100+ Items",
    desc: "Something for everyone",
    icon: "utensils",
  },
];

export type PromoBanner = {
  id: string;
  badge: string;
  title: string;
  description: string;
  cta: string;
  image: string;
};

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: "promo-1",
    badge: "ONLY Rs. 399",
    title: "Zinger Mania",
    description:
      "Zinger burger + fries + drink sirf Rs. 399 mein. Lunch time deal — daily 12PM to 5PM.",
    cta: "Get This Deal",
    image: "/images/burger.jpg",
  },
  {
    id: "promo-2",
    badge: "-15% OFF",
    title: "Family BBQ Night",
    description:
      "Har Sunday Jumbo BBQ Platter par 15% off — poora family ghar ka swaad banaigein.",
    cta: "Avail Offer",
    image: "/images/hero-bbq.jpg",
  },
  {
    id: "promo-3",
    badge: "FREE Chai",
    title: "Free Doodh Patti",
    description:
      "Rs. 1000+ ke order par FREE doodh patti chai — mehmaan aayein, chai Ishaaiya ki taraf se.",
    cta: "Order Now",
    image: "/images/chai.jpg",
  },
  {
    id: "promo-4",
    badge: "BEST VALUE",
    title: "Chicken Karahi Special",
    description:
      "1 kg chicken karahi + tandoori roti + chutney sirf Rs. 1999 — perfect family dinner.",
    cta: "Order Karahi",
    image: "/images/karahi.jpg",
  },
];



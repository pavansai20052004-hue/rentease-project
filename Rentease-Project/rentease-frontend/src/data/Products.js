import bed from "../assets/bed.jpg";
import refrigerator from "../assets/refrigerator.jpg";
import sofa from "../assets/sofa.jpg";
import washingMachine from "../assets/washing-machine.jpg";

const products = [
  {
    id: "sofa",
    name: "Premium 3-Seater Sofa",
    category: "Furniture",
    image: sofa,
    price: 1200,
    deposit: 3000,
    rating: 4.8,
    delivery: "48 hour delivery",
    description: "Soft-touch fabric sofa sized for apartments, studios, and family lounges.",
    specs: ["Deep cushions", "Easy-clean fabric", "Free maintenance"],
  },
  {
    id: "bed",
    name: "Queen Storage Bed",
    category: "Furniture",
    image: bed,
    price: 1500,
    deposit: 4000,
    rating: 4.7,
    delivery: "2 day setup",
    description: "A sturdy queen bed with under-bed storage and doorstep installation.",
    specs: ["Queen size", "Hydraulic storage", "Sanitized before delivery"],
  },
  {
    id: "refrigerator",
    name: "Double Door Refrigerator",
    category: "Appliances",
    image: refrigerator,
    price: 2000,
    deposit: 5000,
    rating: 4.9,
    delivery: "Same week delivery",
    description: "Energy-efficient refrigerator for daily groceries, meal prep, and family use.",
    specs: ["Frost-free", "Stabilizer safe", "Service included"],
  },
  {
    id: "washing-machine",
    name: "Fully Automatic Washer",
    category: "Appliances",
    image: washingMachine,
    price: 1800,
    deposit: 4500,
    rating: 4.6,
    delivery: "Free installation",
    description: "Reliable top-load washer with installation support and quick maintenance.",
    specs: ["7 kg capacity", "Low noise", "Free relocation support"],
  },
];

export default products;

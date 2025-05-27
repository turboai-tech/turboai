import type { Frequency, Tier } from './pricing-types';

import { FrequencyEnum, TiersEnum } from './pricing-types';

export const frequencies: Array<Frequency> = [
  {key: FrequencyEnum.Yearly, label: "Pay Yearly", priceSuffix: "per year"},
  {key: FrequencyEnum.Quarterly, label: "Pay Quarterly", priceSuffix: "per quarter"},
];

export const tiers: Array<Tier> = [
  {
    key: TiersEnum.Pro,
    title: "card_1_title",
    price: "card_1_price",
    href: "#",
    featured: false,
    mostPopular: true,
    description: "card_1_description",
    features: "card_1_features",
    buttonText: "card_1_button_text",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  // {
  //   key: TiersEnum.Pro,
  //   title: "Pro",
  //   description: "For small teams that have less that 10 members.",
  //   href: "#",
  //   mostPopular: true,
  //   price: {
  //     yearly: "$72",
  //     quarterly: "$24",
  //   },
  //   featured: false,
  //   features: [
  //     "20 users included",
  //     "10 GB of storage",
  //     "Help center access",
  //     "Priority email support",
  //   ],
  //   buttonText: "Get started",
  //   buttonColor: "primary",
  //   buttonVariant: "solid",
  // },
  // {
  //   key: TiersEnum.Team,
  //   title: "Team",
  //   href: "#",
  //   featured: true,
  //   mostPopular: false,
  //   description: "For large teams that have more than 10 members.",
  //   price: {
  //     yearly: "$90",
  //     quarterly: "$120",
  //   },
  //   priceSuffix: "per user",
  //   features: [
  //     "50 users included",
  //     "30 GB of storage",
  //     "Help center access",
  //     "Phone & email support",
  //   ],
  //   buttonText: "Contact us",
  //   buttonColor: "default",
  //   buttonVariant: "flat",
  // },
];

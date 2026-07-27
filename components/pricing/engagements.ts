export type EngagementGroup = 'project' | 'partnership';

/** All string fields are i18n keys under the `pricing` namespace. */
export type Engagement = {
  key: string;
  group: EngagementGroup;
  title: string;
  description: string;
  price: string;
  features: string;
  buttonText: string;
  badge?: string;
  featured?: boolean;
};

export const engagements: Array<Engagement> = [
  {
    key: 'sprint',
    group: 'project',
    title: 'card_1_title',
    description: 'card_1_description',
    price: 'card_1_price',
    features: 'card_1_features',
    buttonText: 'card_1_button_text',
  },
  {
    key: 'build',
    group: 'project',
    title: 'card_2_title',
    description: 'card_2_description',
    price: 'card_2_price',
    features: 'card_2_features',
    buttonText: 'card_2_button_text',
    badge: 'card_2_badge',
    featured: true,
  },
  {
    key: 'partner',
    group: 'partnership',
    title: 'card_3_title',
    description: 'card_3_description',
    price: 'card_3_price',
    features: 'card_3_features',
    buttonText: 'card_3_button_text',
  },
];

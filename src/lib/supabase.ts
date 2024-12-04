import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

export const supabase = createClient(env.supabase.url, env.supabase.anonKey);

export interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  email: string;
  page_sections: PageSections;
}

export interface PageSections {
  order: string[];
  sections: {
    [key: string]: {
      visible: boolean;
      title: string;
      content?: any;
    };
  };
  services: {
    order: string[];
    items: {
      [key: string]: {
        visible: boolean;
        title: string;
        description: string;
      };
    };
  };
}
import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import  {Photobox} from '../components/Pfotobox/photobox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Photobox',
  component: Photobox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Photobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
  args: {
        imageArray: [
            {
                url: 'https://i.pinimg.com/originals/ea/a9/90/eaa9909a0b3b723e24adaf46a5848c56.jpg',
                title: 'Растение_1',
                center: [52.057685, 37.527061],
                coordinateForFactories: [
                    {
                        cordinate: [52.057685, 37.527061],
                        degrees: 0
                    },
                    {
                        cordinate: [52.058474, 37.528553],
                        degrees: 45
                    }
                    
                ]
            },
            {
                url: 'https://big-pictures-tropichouse.storage.yandexcloud.net/iblock/491/4916cc1a53d6b89e7cd72deaa6c4ffe8/497c695da4cf47465bae24ce64626d49.webp',
                title: 'Растение_2',
                center: [51.732491, 42.081550],
                coordinateForFactories: [
                    {
                        cordinate: [51.732491, 42.081550],
                        degrees: 0
                    },
                    {
                        cordinate: [51.732491, 42.081550],
                        degrees: 45
                    }
                    
                ]
            },
            {
                url: 'https://i.pinimg.com/originals/e0/ca/61/e0ca61723d5e49c5a0b96256ac7745d9.jpg',
                title: 'Растение_3',
                center: [53.445960, 41.810482],
                coordinateForFactories: [
                    {
                        cordinate: [53.445960, 41.810482],
                        degrees: 0
                    },
                    {
                        cordinate: [53.445607, 41.809579],
                        degrees: 45
                    }  
                ]
            },
            {
                url: 'https://i0.wp.com/obstanovka.club/uploads/posts/2023-05/1685077611_obstanovka-club-p-krupnolistovie-komnatnie-rasteniya-krasivo-15.jpg?ssl=1',
                title: 'Растение_4',
                center: [55.039789, 44.488136],
                coordinateForFactories: [
                    {
                        cordinate: [55.039789, 44.488136],
                        degrees: 0
                    },
                    {
                        cordinate: [55.039546, 44.488425],
                        degrees: 45
                    }  
                ]
            },
            {
                url: 'https://avatars.mds.yandex.net/i?id=75c2591ed34692ab2272591b1b5a8315_l-12423448-images-thumbs&n=13',
                title: 'Растение_5',
                center: [55.617139, 40.668420],
                coordinateForFactories: [
                    {
                        cordinate: [55.617139, 40.668420],
                        degrees: 0
                    },
                    {
                        cordinate: [55.619558, 40.662968],
                        degrees: 45
                    }  
                ]
            },
            {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_XmvtY6ix8DrqYT_gVxI57AfduO8Nr_4AuQ&s',
                title: 'Растение_6',
                center: [53.124374, 46.590631],
                coordinateForFactories: [
                    {
                        cordinate: [53.124374, 46.590631],
                        degrees: 0
                    },
                    {
                        cordinate: [53.123882, 46.596719],
                        degrees: 45
                    }  
                ]
            },
            {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjwWhsUvIdqCIF0eDRL1cMIXzv5tqUPLWV8Q&s',
                title: 'Растение_7',
                center: [56.112342, 47.471257],
                coordinateForFactories: [
                    {
                        cordinate: [56.112342, 47.471257],
                        degrees: 0
                    },
                    {
                        cordinate: [56.111717, 47.475253],
                        degrees: 60
                    }  
                ]
            },
            {
                url: 'https://st.dg-home.ru/upload/resize_cache/blog_editor/77e/tbko0l63zty0foni8nnad5sbzk9remmh/900_900_0/rasteniya_v_interyere_.jpg',
                title: 'Растение_8',
                center: [52.611466, 39.589653],
                coordinateForFactories: [
                    {
                        cordinate: [52.611466, 39.589653],
                        degrees: 0
                    },
                    {
                        cordinate: [52.612329, 39.590165],
                        degrees: 45
                    }  
                ]
            },
            {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbQzZ_O94B5PcgJn1UhgJN43NayFFpFIhvg&s',
                title: 'Растение_9',
                center: [56.327004, 44.003792],
                coordinateForFactories: [
                    {
                        cordinate: [56.327004, 44.003792],
                        degrees: 0
                    },
                    {
                        cordinate: [56.327846, 44.004561],
                        degrees: 45
                    }  
                ]
            },
            {
                url: 'https://luxuryplants.ru/wa-data/public/shop/products/09/61/26109/images/86573/86573.520.jpg',
                title: 'Растение_10',
                center: [55.760160, 37.608244],
                coordinateForFactories: [
                    {
                        cordinate: [55.760160, 37.608244],
                        degrees: 0
                    },
                    {
                        cordinate: [55.760651, 37.607556],
                        degrees: 45
                    }  
                ]
            }
        ]
  },
};
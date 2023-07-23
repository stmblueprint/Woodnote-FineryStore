
import { useEffect } from 'react';
import axios from 'axios';

const CreateOrder = () => {
  useEffect(() => {
    const createOrder = async () => {
      const orderData = {
        external_id: '4235234213',
        shipping: 'STANDARD',
        recipient: {
          name: '',
          company: 'Woodnote-Finery',
          address1: '',
          address2: '',
          city: '',
          state_code: 'CA',
          state_name: 'California',
          country_code: 'US',
          country_name: 'United States',
          zip: '91311',
          phone: 'string',
          email: 'string',
          tax_number: '123.456.789-10'
        },
        items: [
          {
            id: 1,
            external_id: 'item-1',
            variant_id: 1,
            sync_variant_id: 1,
            external_variant_id: 'variant-1',
            warehouse_product_variant_id: 1,
            product_template_id: 1,
            external_product_id: 'template-123',
            quantity: 1,
            price: '13.00',
            retail_price: '13.00',
            name: 'Enhanced Matte Paper Poster 18×24',
            product: {
              variant_id: 3001,
              product_id: 301,
              image: 'https://files.cdn.printful.com/products/71/5309_1581412541.jpg',
              name: 'Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)'
            },
            files: [
              {
                type: 'default',
                url: 'https://www.example.com/files/tshirts/example.png',
                options: [
                  {
                    id: 'template_type',
                    value: 'native'
                  }
                ],
                filename: 'shirt1.png',
                visible: true,
                position: {
                  area_width: 1800,
                  area_height: 2400,
                  width: 1800,
                  height: 1800,
                  top: 300,
                  left: 0,
                  limit_to_print_area: true
                }
              }
            ],
            options: [
              {
                id: 'OptionKey',
                value: 'OptionValue'
              }
            ],
            sku: null,
            discontinued: true,
            out_of_stock: true
          }
        ],
        retail_costs: {
          currency: 'USD',
          subtotal: '10.00',
          discount: '0.00',
          shipping: '5.00',
          tax: '0.00'
        },
        gift: {
          subject: 'To John',
          message: 'Have a nice day'
        },
        packing_slip: {}
      };

      try {
        // const response = await axios.post('https://api.printful.com/orders', orderData);
        // console.log('Order created:', response.data);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    createOrder();
  }, []);

  return <div>Creating order...</div>;
};

export default CreateOrder;

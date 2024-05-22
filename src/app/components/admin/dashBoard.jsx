'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

const Dashboard = () => {
  const categories = [
    {
      "_id": "66407d42a44ec7f75bd26fce",
      "name": "Apple Watch",
      "slug": "apple-watch",
      "description": "Stay connected, stay healthy, and express your style with Apple Watch.",
      "parent": null,
      "ancestors": [],
      "image": "https://flowbite.com/docs/images/products/apple-watch.png",
      "isActive": true,
      "createdAt": "2024-05-01T12:00:00.000Z",
      "updatedAt": "2024-05-01T12:00:00.000Z"
    },
    {
      "_id": "663616037a335211caabe7e7",
      "name": "Gaming Monitors",
      "slug": "gaming-monitors",
      "description": "Experience immersive gaming with high-quality gaming monitors.",
      "parent": null,
      "ancestors": [],
      "image": "https://assetsio.gnwcdn.com/1692603178869.jpg?width=690&quality=75&format=jpg&dpr=2&auto=webp",
      "isActive": true,
      "createdAt": "2024-05-01T12:00:00.000Z",
      "updatedAt": "2024-05-01T12:00:00.000Z"
    },
    {
      "_id": "663616037a335211caabe7e9",
      "name": "MacBooks",
      "slug": "macbooks",
      "description": "Explore the MacBook range for powerful performance and sleek design.",
      "parent": null,
      "ancestors": [],
      "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
      "isActive": true,
      "createdAt": "2024-05-01T12:00:00.000Z",
      "updatedAt": "2024-05-01T12:00:00.000Z"
    },
    {
      "_id": "663616037a335211caabe7e8",
      "name": "Mobile Phones",
      "slug": "mobile-phones",
      "description": "Discover the latest smartphones with advanced features.",
      "parent": null,
      "ancestors": [],
      "image": "https://www.samsungmobilepress.com/file/B1451680D49421D2EF196E8744B721CB102084AE494FEF3EA0040E0EA67ED31E895F515F2E6B5A8920B2251EF086C1662A573753A31D59F35A05E4724CEA7A052F35353ECFFE1C40AC11DF482128D81EA3D05347CFFF7AD38B703E0F7BB4F7847C1395FF032CCD0E85C72D1D97B6B2DFDBC24B570CAFE3316C10B5EFEE876114",
      "isActive": true,
      "createdAt": "2024-05-01T12:00:00.000Z",
      "updatedAt": "2024-05-01T12:00:00.000Z"
    }
  ];

  const products = [
    {
      "_id": "66376e1a31d03e39f34f59df",
      "title": "Gaming Monitor 27-inch",
      "description": "Immersive gaming experience with 27-inch display.",
      "price": 299.99,
      "images": [
        "https://img.overclockers.co.uk/images/MON-MSI-00581/8f488c373102e2b7a61f9974c5d24ca6.jpg"
      ],
      "stockQuantity": 100,
      "timesBought": 0,
      "category": {
        "_id": "663616037a335211caabe7e7",
        "name": "Gaming Monitors",
        "slug": "gaming-monitors",
        "description": "Experience immersive gaming with high-quality gaming monitors.",
        "parent": null,
        "ancestors": [],
        "image": "https://assetsio.gnwcdn.com/1692603178869.jpg?width=690&quality=75&format=jpg&dpr=2&auto=webp",
        "isActive": true,
        "createdAt": "2024-05-01T12:00:00.000Z",
        "updatedAt": "2024-05-01T12:00:00.000Z"
      }
    },
    {
      "_id": "66376e1a31d03e39f34f59e0",
      "title": "iPhone 15 Pro",
      "description": "The latest iPhone with advanced features.",
      "price": 999.99,
      "images": [
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=70&.v=UW1GeTRObi9UaVF4S3FUNERNMWVhZ2FRQXQ2R0JQTk5udUZxTkR3ZVlpS0o0bnJBQlJYRTdzdWVwMVBVb2c4L0lYUWYrQkRLNitCbE9QRVRqNHErMkE3b3pFWnhZZ2g0M0pRR0pEdHVSRUcyRlVVa0JFTnZqc0lHcUFYQnFjNXpkc3NlSXRDWlQ3WVl5dEd4ZUF1dDFRPT0=&traceId=1"
      ],
      "stockQuantity": 50,
      "timesBought": 0,
      "category": {
        "_id": "663616037a335211caabe7e8",
        "name": "Mobile Phones",
        "slug": "mobile-phones",
        "description": "Discover the latest smartphones with advanced features.",
        "parent": null,
        "ancestors": [],
        "image": "https://www.samsungmobilepress.com/file/B1451680D49421D2EF196E8744B721CB102084AE494FEF3EA0040E0EA67ED31E895F515F2E6B5A8920B2251EF086C1662A573753A31D59F35A05E4724CEA7A052F35353ECFFE1C40AC11DF482128D81EA3D05347CFFF7AD38B703E0F7BB4F7847C1395FF032CCD0E85C72D1D97B6B2DFDBC24B570CAFE3316C10B5EFEE876114",
        "isActive": true,
        "createdAt": "2024-05-01T12:00:00.000Z",
        "updatedAt": "2024-05-01T12:00:00.000Z"
      }
    },
    {
      "_id": "66376e1a31d03e39f34f59e1",
      "title": "MacBook Pro 2024",
      "description": "Powerful performance and sleek design.",
      "price": 1999.99,
      "images": [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D"
      ],
      "stockQuantity": 20,
      "timesBought": 0,
      "category": {
        "_id": "663616037a335211caabe7e9",
        "name": "MacBooks",
        "slug": "macbooks",
        "description": "Explore the MacBook range for powerful performance and sleek design.",
        "parent": null,
        "ancestors": [],
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        "isActive": true,
        "createdAt": "2024-05-01T12:00:00.000Z",
        "updatedAt": "2024-05-01T12:00:00.000Z"
      }
    },
    {
      "_id": "66376e1a31d03e39f34f59e2",
      "title": "Apple Watch Series 8",
      "description": "Stay connected and healthy with Apple Watch.",
      "price": 399.99,
      "images": [
        "https://flowbite.com/docs/images/products/apple-watch.png"
      ],
      "stockQuantity": 30,
      "timesBought": 0,
      "category": {
        "_id": "66407d42a44ec7f75bd26fce",
        "name": "Apple Watch",
        "slug": "apple-watch",
        "description": "Stay connected, stay healthy, and express your style with Apple Watch.",
        "parent": null,
        "ancestors": [],
        "image": "https://flowbite.com/docs/images/products/apple-watch.png",
        "isActive": true,
        "createdAt": "2024-05-01T12:00:00.000Z",
        "updatedAt": "2024-05-01T12:00:00.000Z"
      }
    }
  ];

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = categories.map(category => {
      const totalPrice = products
        .filter(product => product.category._id === category._id)
        .reduce((total, product) => total + product.price, 0);

      return {
        category: category.name,
        totalPrice,
        color: getRandomColor()
      };
    });

    setChartData(data);
  }, [categories, products]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Category Price Distribution
      </Typography>
      <Box height="500px">
        <ResponsiveBar
          data={chartData}
          keys={['totalPrice']}
          indexBy="category"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={({ id, data }) => data.color}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Category',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total Price',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;

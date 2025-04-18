const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image:[ {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1500,
    location: "Malibu",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-118.7798, 34.0259],  // Corrected to [longitude, latitude]
    },
    category_type: "beach",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1200,
    location: "New York City",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-73.9857, 40.7484],  // Corrected to [longitude, latitude]
    },
    category_type: "trending"
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image:[ {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1000,
    location: "Aspen",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-106.8230, 39.1911],  // Corrected to [longitude, latitude]
    },
    category_type: "trending"
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 2500,
    location: "Florence",
    country: "Italy",
    geography: {
      type: "Point",
      coordinates: [11.2558, 43.7696],  // Corrected to [longitude, latitude]
    },
    category_type: "mountain"
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 800,
    location: "Portland",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-122.6765, 45.5231],  // Corrected to [longitude, latitude]
    },
    category_type: "mountain"
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geography: {
      type: "Point",
      coordinates: [-86.8515, 21.1743],  // Corrected to [longitude, latitude]
    },
    category_type: "iconic_cities"
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-120.0324, 39.0968],  // Corrected to [longitude, latitude]
    },
    category_type: "iconic_cities"
  },
  
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    geography: {
      type: "Point",
      coordinates: [7.2821, 46.0850],  // Corrected to [longitude, latitude]
    },
    category_type: "rooms"
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    geography: {
      type: "Point",
      coordinates: [34.8325, -2.3338],  // Corrected to [longitude, latitude]
    },
    category_type: "camping"
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG93ZWx8ZW58MHx8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 2200,
    location: "Amsterdam",
    country: "Netherlands",
    geography: {
      type: "Point",
      coordinates: [4.9041, 52.3676],  // Corrected to [longitude, latitude]
    },
    category_type: "camping"
  },
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1500,
    location: "Malibu",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-118.7798, 34.0259],  // Corrected to [longitude, latitude]
    },
    category_type: "iconic_cities"
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1200,
    location: "New York City",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-73.9857, 40.7484],  // Corrected to [longitude, latitude]
    },
    category_type: "mountain"
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 1000,
    location: "Aspen",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-106.8230, 39.1911],  // Corrected to [longitude, latitude]
    },
    category_type: "mountain"
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 2500,
    location: "Florence",
    country: "Italy",
    geography: {
      type: "Point",
      coordinates: [11.2558, 43.7696],  // Corrected to [longitude, latitude]
    },
    category_type: "farm"
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 800,
    location: "Portland",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-122.6765, 45.5231],  // Corrected to [longitude, latitude]
    },
    category_type: "farm"
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    }],
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geography: {
      type: "Point",
      coordinates: [-86.8515, 21.1743],  // Corrected to [longitude, latitude]
    },
    category_type: "farm"
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: [{
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    }],
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    geography: {
      type: "Point",
      coordinates: [-120.0324, 39.0968],  // Corrected to [longitude, latitude]
    },
    category_type: "farm"
  },
];

module.exports = sampleListings;

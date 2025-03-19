export const ROUTES = {
  'DEL-HYD': {
    distance: '1253 km',
    minDuration: 110, // 1hr 50min in minutes
    maxDuration: 480, // 8hrs in minutes
    basePrice: 7000
  },
  'DEL-BOM': {
    distance: '1148 km',
    minDuration: 90, // 1hr 30min in minutes
    maxDuration: 420, // 7hrs in minutes
    basePrice: 6500
  },
  'DEL-BLR': {
    distance: '1300 km',
    minDuration: 120, 
    maxDuration: 520, 
    basePrice: 7500
  },
  'DEL-PNQ': {
    distance: '1170 km',
    minDuration: 80, 
    maxDuration: 420, 
    basePrice: 6400
  },
  'DEL-AMD': {
    distance: '900 km',
    minDuration: 70, 
    maxDuration: 350,
    basePrice: 5500
  },
  'HYD-DEL': {
    distance: '1253 km',
    minDuration: 110,
    maxDuration: 480,
    basePrice: 7000
  },
 'HYD-BOM': {
    distance: '631 km',
    minDuration: 70, // 1hr 10min in minutes
    maxDuration: 360, // 6hrs in minutes
    basePrice: 5500
  },
  'HYD-BLR': {
    distance: '800 km',
    minDuration: 90, 
    maxDuration: 420, 
    basePrice: 5500
  },
  'HYD-PNQ': {
    distance: '700 km',
    minDuration: 60, 
    maxDuration: 320, 
    basePrice: 4400
  },
  'HYD-AMD': {
    distance: '900 km',
    minDuration: 100, 
    maxDuration: 550,
    basePrice: 6500
  },
  'BOM-DEL': {
    distance: '1148 km',
    minDuration: 90,
    maxDuration: 420,
    basePrice: 6500
  },
  
  'BOM-HYD': {
    distance: '631 km',
    minDuration: 70,
    maxDuration: 360,
    basePrice: 5500
  },
  'BOM-BLR': {
    distance: '1300 km',
    minDuration: 120, 
    maxDuration: 520, 
    basePrice: 7500
  },
  'BOM-PNQ': {
    distance: '270 km',
    minDuration: 30, 
    maxDuration: 120, 
    basePrice: 3000
  },
  'BOM-AMD': {
    distance: '900 km',
    minDuration: 70, 
    maxDuration: 350,
    basePrice: 5500
  },
  'BLR-DEL': {
    distance: '1300 km',
    minDuration: 120, 
    maxDuration: 520, 
    basePrice: 7500
  },
  
  'BLR-HYD': {
    distance: '800 km',
    minDuration: 90, 
    maxDuration: 420, 
    basePrice: 5500
  },
  'BLR-BOM': {
    distance: '1300 km',
    minDuration: 120, 
    maxDuration: 520, 
    basePrice: 7500
  },
  'BLR-PNQ': {
    distance: '1170 km',
    minDuration: 80, 
    maxDuration: 420, 
    basePrice: 6400
  },
  'BLR-AMD': {
    distance: '3000 km',
    minDuration: 170, 
    maxDuration: 550,
    basePrice: 7500
  },
  'PNQ-DEL': {
    distance: '1170 km',
    minDuration: 80, 
    maxDuration: 420, 
    basePrice: 6400
  },
  
  'PNQ-HYD': {
    distance: '700 km',
    minDuration: 60, 
    maxDuration: 320, 
    basePrice: 4400
  },
  'PNQ-BOM': {
    distance: '270 km',
    minDuration: 30, 
    maxDuration: 120, 
    basePrice: 3000
  },
  'PNQ-BLR': {
    distance: '1170 km',
    minDuration: 80, 
    maxDuration: 420, 
    basePrice: 6400
  },
  'PNQ-AMD': {
    distance: '1180 km',
    minDuration: 120, 
    maxDuration: 600,
    basePrice: 7500
  },
  'AMD-DEL': {
    distance: '900 km',
    minDuration: 70, 
    maxDuration: 350,
    basePrice: 5500
  },
  
  'AMD-HYD': {
    distance: '900 km',
    minDuration: 100, 
    maxDuration: 550,
    basePrice: 6500
  },
  'AMD-BOM': {
    distance: '900 km',
    minDuration: 70, 
    maxDuration: 350,
    basePrice: 5500
  },
  'AMD-BLR': {
    distance: '3000 km',
    minDuration: 170, 
    maxDuration: 550,
    basePrice: 7500
  },
  'AMD-PNQ': {
    distance: '1180 km',
    minDuration: 120, 
    maxDuration: 600,
    basePrice: 7500
  },
};

export const AIRLINES = [
  {
    code: 'SG',
    name: 'SpiceJet',
    logo: '/Spicejet.png',
    primaryColor: '#ff5722'
  },
  {
    code: '6E',
    name: 'IndiGo',
    logo: '/Indigo.jpeg',
    primaryColor: '#0a4894'
  },
  {
    code: 'QP',
    name: 'Akasa Air',
    logo: '/Akasa Air.png',
    primaryColor: '#ff6b6b'
  },
  {
    code: 'AI',
    name: 'Air India',
    logo: '/Air India.jpeg',
    primaryColor: '#e31837'
  }
];

// Add this interface for better type safety
export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  logo: string;
  flightNumber: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  type: string;
  price: number;
  terminal: string;
  gate: string;
}

// Add utility functions for time handling
const getCurrentTime = () => {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes()
  };
};

const formatTime = (hours: number, minutes: number) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}hr ${mins}min`;
};

// Add function to generate random duration based on flight type
const generateDuration = (route: typeof ROUTES[keyof typeof ROUTES], isNonStop: boolean): {
  duration: string;
  durationInMinutes: number;
} => {
  let durationInMinutes: number;
  
  if (isNonStop) {
    durationInMinutes = route.minDuration + Math.floor(Math.random() * 30); // Add 0-30 minutes for variations
  }
   else {
    const minWithStops = route.minDuration + 90; // Minimum 1.5 hours extra for stops
    durationInMinutes = minWithStops + Math.floor(Math.random() * (route.maxDuration - minWithStops));
  }
  
  return {
    duration: formatDuration(durationInMinutes),
    durationInMinutes
  };
};

// Update the flight generation function
export const generateFlightSchedules = (from: string, to: string, date: string) => {
  const routeKey = `${from}-${to}` as keyof typeof ROUTES;
  const route = ROUTES[routeKey];
  
  if (!route) {
    return [];
  }

  const currentTime = getCurrentTime();
  const selectedDate = new Date(date);
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  // Generate time slots starting from current time if it's today
  const generateTimeSlots = () => {
    const slots = [];
    let baseHour = isToday ? currentTime.hours : 6;
    let baseMinute = isToday ? Math.ceil(currentTime.minutes / 15) * 15 : 0;

    for (let i = 0; i < 3; i++) {
      const depTime = formatTime(baseHour, baseMinute);
      const { duration, durationInMinutes } = generateDuration(route, true);
      
      // Calculate arrival time based on duration
      const arrivalMinutes = baseHour * 60 + baseMinute + durationInMinutes;
      const arrHour = Math.floor(arrivalMinutes / 60) % 24;
      const arrMinute = arrivalMinutes % 60;
      const arrTime = formatTime(arrHour, arrMinute);
      
      slots.push({ 
        dep: depTime, 
        arr: arrTime,
        duration,
        type: 'Non Stop' 
      });

      // Increment by 1-2 hours randomly
      baseMinute += Math.floor(Math.random() * 60);
      baseHour += 1 + Math.floor(Math.random() * 2);
      
      if (baseHour >= 24) break;
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Generate flights with the new duration logic
  const flights = AIRLINES.flatMap((airline) => {
    return timeSlots.map((slot, slotIndex) => {
      const basePrice = Math.floor(
        route.basePrice + (Math.random() * 2000) + 
        (slotIndex * 100) 
      );

      return {
        id: `${airline.code}-${date}-${slotIndex}`,
        airline: airline.name,
        airlineCode: airline.code,
        logo: airline.logo,
        flightNumber: `${airline.code} ${100 + slotIndex}`,
        from,
        to,
        date,
        departureTime: slot.dep,
        arrivalTime: slot.arr,
        duration: slot.duration,
        type: 'Non Stop',
        price: Math.round(basePrice / 100) * 100,
        // seatsAvailable: Math.floor(Math.random() * 30) + 1,
        terminal: ['T1', 'T2', 'T3'][Math.floor(Math.random() * 3)],
        gate: `${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 20) + 1}`
      };
    });
  });

 

 

  // Sort by departure time and then by price
  return flights.sort((a, b) => {
    const timeA = a.departureTime.replace(':', '');
    const timeB = b.departureTime.replace(':', '');
    if (timeA === timeB) {
      return a.price - b.price;
    }
    return timeA.localeCompare(timeB);
  });
};


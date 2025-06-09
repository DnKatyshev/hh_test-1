const BASE_URL = import.meta.env.VITE_SERVER_URL;


export const getData = async (chunk, limit) => {
  try {
    const request = await fetch(`${BASE_URL}/get-data?chunk=${chunk}&limit=${limit}`);

    if (!request.ok) {
      return { status: request.status };
    }

    const response = await request.json();
    return { status: 200, response };
    
  } 
  
  catch (error) {
    return { status: 400, error };
  }
};
  

export const searchByNumber = async (number) => {
  try {
    const request = await fetch(`${BASE_URL}/search-by-number?number=${number}`);

    if (!request.ok) {
      return { status: request.status };
    }

    const response = await request.json();
    return { status: 200, response };
  } 
  
  catch (error) {
    return { status: 400, error };
  }
};

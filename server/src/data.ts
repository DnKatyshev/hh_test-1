// server/data.ts
export const data = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    number: Math.floor(Math.random() * 1000000) + 1,
}));  
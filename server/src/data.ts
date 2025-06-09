// server/data.ts
export const data = Array.from({ length: 1000000 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
}));
export const paginate = (per_page, page, data) => {
    const start = (page - 1) * per_page;
    const end = page * per_page;
    return {
        page: page,
        per_page: per_page,
        total: data.length,
        total_pages: Math.ceil(data.length / per_page),
        data: data.slice(start, end)
    };
}
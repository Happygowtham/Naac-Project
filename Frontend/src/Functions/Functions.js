export function groupBy(data, key) {
    const result = data.reduce((acc, curr) => {
        acc[curr[key]] = [...(acc[curr[key]] || []), curr];
        return acc;
    }, {});
    return result;
}
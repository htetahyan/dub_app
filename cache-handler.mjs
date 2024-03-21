const cache = new Map()
const EXPIRATION_TIME = 1000*60*60*24
export default class CacheHandler {
    constructor(options) {
        this.options = options
    }

    async get(key) {
        const value = await cache.get(key)
        return value?.exp> Date.now() ? value : null;

    }

    async set(key, data, ctx) {
        cache.set(key, {
            value: data,
            lastModified: Date.now(),
            tags: ctx.tags,
            exp: Date.now() + EXPIRATION_TIME
        })
    }

    async revalidateTag(tag) {
        for (let [key, value] of cache) {
            if (value.tags.includes(tag)) {
                cache.delete(key)
            }
        }}
}
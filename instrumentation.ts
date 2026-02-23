export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initializeQueues } = await import('./lib/lead-system/queue')
    await initializeQueues()
    console.log('[YGI] Bull queues initialized')
  }
}

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import Critters from 'critters'

const distPath = join(process.cwd(), 'dist', 'index.html')

async function run() {
    const critters = new Critters({
        path: join(process.cwd(), 'dist'),
        preload: 'swap',
        inlineFonts: true,
        pruneSource: true,
    })

    const html = readFileSync(distPath, 'utf8')
    const output = await critters.process(html)
    writeFileSync(distPath, output)
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})

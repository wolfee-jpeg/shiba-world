const fs = require('fs-extra')
const path = require('path')

async function main() {
  try {
    const sourcePath = path.resolve(process.cwd(), 'source.json')
    if (!(await fs.exists(sourcePath))) {
      throw new Error(
        'Source file does not exist. Must be source.json in working dir'
      )
    }

    const assets = await fs.readJson(sourcePath)

    console.log(`Found ${assets.length} assets`)

    const formattedAssets = assets.map(
      ({ id, title, description, thumbnailUrl, isAdult }) => ({
        objectID: id,
        title,
        description,
        thumbnailUrl,
        isAdult,
      })
    )

    await fs.writeJson(
      path.resolve(process.cwd(), 'output.json'),
      formattedAssets
    )

    console.log('Job done: output.json')

    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()

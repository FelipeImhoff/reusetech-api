import { DriveConfig } from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'

const driveConfig: DriveConfig = {
  disk: 'local',
  disks: {
    local: {
      driver: 'local',
      visibility: 'public',
      root: Application.publicPath('uploads'),
    },
  },
}

export default driveConfig

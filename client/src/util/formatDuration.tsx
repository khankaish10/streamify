import moment from 'moment'
import 'moment-duration-format'

declare module 'moment' {
  interface Duration {
    format: (template: string, options?:{trim?:boolean}) => string
  }
}

const formatDuration = (seconds: number) => {
    if(seconds < 1) return `${seconds.toFixed(1)}s`

    const duration = moment.duration(seconds, 'seconds')
    return duration.format('m:ss', { trim: false})
  }




  export default formatDuration
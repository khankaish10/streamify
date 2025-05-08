import moment from 'moment'
import 'moment-duration-format'

const formatDuration = (seconds: number) => {
    if(seconds < 1) return `${seconds.toFixed(1)}s`

    return moment.duration(seconds, 'seconds')?.format('m:ss', { trim: false})
  }




  export default formatDuration
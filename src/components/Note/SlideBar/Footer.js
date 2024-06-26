import SwitchLang from './SwitchLang'
import Upload from '@components/Upload'

export function Footer({ lng }) {
  return <footer style={{ margin: 20 }}>
    <Upload lang={lng}/>
    <SwitchLang lang={lng} />
  </footer>
}

export default Footer

import { ReactNodeChildrenProp } from '../interface/ReactNodeChildrenProp'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

export default function Layout({children}: ReactNodeChildrenProp) {
  return (
    <>
      <Header/>
      <Main children={children}/>
      <Footer/>
    </>
  )
}

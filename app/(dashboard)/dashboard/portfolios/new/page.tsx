import RequestForm from './RequestForm'
import * as s from '@/styles/dashboard/requestForm.css'

export default function NewPortfolioPage() {
  return (
    <div className={s.page}>
      <div className={s.card}>
        <h1 className={s.heading}>페이지 제작 요청</h1>
        <RequestForm />
      </div>
    </div>
  )
}

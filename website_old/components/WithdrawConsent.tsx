export default function WithdrawConsent() {
  const withdraw = () => {
    // remove consent from local storage
    localStorage.removeItem('cookieConsent');
    // reload page
    location.reload();
  }

  return <>
    <button style={{ textDecoration: 'underline' }} onClick={withdraw}>
      Reset cookie consent
    </button>
  </>
}

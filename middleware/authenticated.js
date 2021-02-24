export default function ({ store, redirect, route }) {
  if (!store.state.auth) {
    return redirect('/login')
  } 
}

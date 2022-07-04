import { PencilLine } from 'phosphor-react'
import { Avatar } from './Avatar'
import styles from './Sidebar.module.css'
export function Sidebar(){
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover}
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=40" 
                alt="" 
            />
            <div className={styles.profile}>
                <Avatar src="https://github.com/claudioalberto.png" />
                <strong>Claudio Alberto</strong>
                <span>Front-End Developer</span>
            </div>
            <footer>
                <a href="">
                    <PencilLine size={20}/>
                    Editar o perfil
                </a>
            </footer>
        </aside>
    )
}
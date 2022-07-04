import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'



export function Post({ author, publishedAt, content }) {

    const [comments, setComments] = useState([
        'Post muito legal'
    ])
    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr
    })
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBr,
        addSuffix: true
    })

    const isNewCommentEmpty = newCommentText.length === 0

    function handleCreateNewComment(event){
        event.preventDefault()
        const newCommentText = event.target.comment.value
        setComments([...comments, newCommentText])
        setNewCommentText('')
    }
    function handleNewCommentChange(event){
        event.target.setCustomValidity('')
       setNewCommentText(event.target.value)
    }
    function handleNewCommentInvalid(event){
        event.target.setCustomValidity('Esse Campo é Obrigatório!')
    }
    function deleteComment(commenttoDelete){

        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commenttoDelete;
        })

        setComments(commentsWithoutDeletedOne)
    }


    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar
                        hasBorder
                        src={author.avatarUrl}
                    />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    }
                    else if (line.type === 'link') {
                        return <p key={line.content}><a href="">{line.content}</a></p>
                    }
                })}
                <p>
                    <a href="">
                        #novoprojeto
                    </a>{' '}
                    <a href="">
                        #nlw
                    </a>{' '}
                    <a href="">
                        #rocketseat
                    </a>
                </p>
            </div>
            <form 
                className={styles.commentForm}
                onSubmit={handleCreateNewComment}
            >
                <strong>Deixe seu feedback</strong>
                <textarea
                    name='comment'
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required>

                </textarea>
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Comentar</button>
                </footer>

            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}
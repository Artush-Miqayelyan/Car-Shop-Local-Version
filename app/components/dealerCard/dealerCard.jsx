import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './dealerCard.module.css'

function DealerCard({key , username , AvatarUrl}) {
    return <div key={key} className={styles.dealerCard}>
        <div className={styles.dealerAvatar}>
            <Link href={`/dealers/${username}`}>
                <Image
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    objectFit="cover"
                    className={styles.img}
                    src={AvatarUrl}
                    alt='offcial dealer'
                />
            </Link>
        </div>
        <div className={styles.dealerName}>
            {username}
        </div>
    </div>
}

export default DealerCard;
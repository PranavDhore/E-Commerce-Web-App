import React from 'react'
import { API } from '../Backend'

 

export default function ({product}) {

    const imageUrl = product ? `${API}/product/photo/${product._id}` : 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png';

  return (
        <div className="rounded border border-success p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
        </div>
  )
}

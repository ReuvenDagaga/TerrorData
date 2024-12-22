import React from 'react'
import { TerrorEvent } from '../../../interface/TerrorEvent'
import DetailsSpaceWithMap from '../../DetailsSpaceWithMap'

interface Props {
 data: any
 urlToMakeGetData: string
}

export default function DetailsSpace({data, urlToMakeGetData}: Props) {
    if (data.length > 0) {
        if  (urlToMakeGetData === "http://localhost:3222/api/analysis/deadliest-attack-types") {
            return (
                <DetailsSpaceWithMap data={data} />
            )
            if  (urlToMakeGetData === "http://localhost:3222/api/analysis/deadliest-attack-types") {
                return (
                    <DetailsSpaceWithMap data={data} />
                )
                if  (urlToMakeGetData === "http://localhost:3222/api/analysis/deadliest-attack-types") {
                    return (
                        <DetailsSpaceWithMap data={data} />
                    )
                    if  (urlToMakeGetData === "http://localhost:3222/api/analysis/deadliest-attack-types") {
                        return (
                            <DetailsSpaceWithMap data={data} />
                        )
    }
  return (
    <div>DetailsSpace</div>
  )
}
            }}}}

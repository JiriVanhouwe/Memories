import { Pipe, PipeTransform } from '@angular/core';
import { Memory } from './memory';

@Pipe({
    name: 'memoryFilter'
})

export class MemoryFilterPipe implements PipeTransform{
    transform(memories: Memory[], name: string): Memory[] {
        if(!name || name.length === 0){
            return memories;
        }
        return memories.filter(mem => mem.title.toLowerCase().includes(name.toLowerCase()) 
            || mem.subTitle.toLowerCase().includes(name.toLowerCase())
            || mem.location.city.toLowerCase().includes(name.toLowerCase())
            || mem.location.country.toLowerCase().includes(name.toLowerCase()))
            
    }

}
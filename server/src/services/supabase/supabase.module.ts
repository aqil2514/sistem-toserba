import { Global, Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SupabaseRepositoryService } from './supabase.service';

@Global()
@Module({
  providers: [SupabaseRepositoryService,
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: () => {
        return createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );
      },
    },
  ],
  exports: ['SUPABASE_CLIENT', SupabaseRepositoryService],
})
export class SupabaseModule {}

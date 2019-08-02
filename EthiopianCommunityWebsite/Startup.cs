using EthiopianCommunityWebsite.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace EthiopianCommunityWebsite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			services.AddCors();
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.Configure<DbConfiguration>(Configuration);
            services.AddTransient<UserRepository>();
            services.AddTransient<EventRepository>();
            services.AddTransient<EventVolunteerServiceRepository>();

            //services.AddTransient<ITargetRepository>(builder => builder.GetService<StubTargetRepository>());
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.IncludeErrorDetails = true;
                options.Authority = "https://securetoken.google.com/ethiopian-community";
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = "https://securetoken.google.com/ethiopian-community",
                    ValidateAudience = true,
                    ValidAudience = "ethiopian-community",
                    ValidateLifetime = true
                };
            });
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //app.usehttpsredirection();
            //app.usespastaticfiles();

            //app.usemvc(routes =>
            //{
            //    routes.maproute(
            //        name: "default",
            //        template: "{controller}/{action=index}/{id?}");
            //});

            //app.usespa(spa =>
            //{
            //   spa.options.sourcepath = "clientapp";

            //    if (env.isdevelopment())
            //    {
            //        spa.usereactdevelopmentserver(npmscript: "start");
            //    }
            //});
            app.UseStaticFiles();
          

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
            });

            app.UseMvc();
        }
    }
    public class DbConfiguration
    {
        public string ConnectionString { get; set; }
    }
}
